import {
	useState,
	useEffect,
	useCallback,
	useContext,
	createContext,
} from "react";

import api from "../api";
import { setTokens, clearTokens, getTokens } from "../tokens";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [tokens, setTokensState] = useState(() => getTokens());

	const fetchUser = useCallback(async () => {
		// Don't fetch if no access token
		if (!tokens.accessToken) {
			setLoading(false);
			setUser(null);
			return;
		}

		try {
			setLoading(true);
			const response = await api.get("v1/accounts/me/");
			setUser(response.data);
		} catch (error) {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, [tokens.accessToken]);

	const loginUser = async (tokens) => {
		// Store tokens
		setTokens(tokens.access, tokens.refresh);
		setTokensState({ accessToken: tokens.access, refreshToken: tokens.refresh });

		try {
			// Fetch and set user data
			const userResponse = await api.get("v1/accounts/me/");
			setUser(userResponse.data);

			return userResponse.data;
		} catch (error) {
			clearTokens();
			setTokensState({ accessToken: null, refreshToken: null });
			throw error;
		}
	};

	const logoutUser = () => {
		// Clear tokens
		clearTokens();
		setTokensState({ accessToken: null, refreshToken: null });

		// Clear user state
		setUser(null);
	};

	useEffect(() => {
		fetchUser();
	}, [fetchUser, tokens.accessToken]);

	return (
		<UserContext.Provider
			value={{ user, setUser, loading, fetchUser, loginUser, logoutUser }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};
