import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Получаем настройки из опубликованной версии (`/api/live`)
export const fetchSettings = createAsyncThunk("site/fetchSettings", async () => {
    const response = await axios.get("http://localhost:5000/api/live");
    return response.data;
});

const siteSlice = createSlice({
    name: "site",
    initialState: {
        logo: "",
        bgImage: "",
        text: "Добро пожаловать!",
        headerColor: "#ffffff",
        buttonColor: "#007bff",
        buttonText: "Перейти к товарам",
        footerText: "© 2025 Все права защищены",
        footerColor: "#1a1a1a",
        phone: "+7 (999) 123-45-67",
        email: "info@example.com",
        address: "г. Алматы, ул. Абая 10",
        socialLinks: [
            { id: 1, name: "Instagram", url: "https://instagram.com" },
            { id: 2, name: "Facebook", url: "https://facebook.com" },
            { id: 3, name: "Twitter", url: "https://twitter.com" }
        ]
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            return { ...state, ...action.payload };
        });
    }
});

const store = configureStore({
    reducer: {
        site: siteSlice.reducer
    }
});

export default store;
