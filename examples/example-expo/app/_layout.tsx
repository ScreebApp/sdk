import * as Screeb from "@screeb/react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Linking } from "react-native";

export default function RootLayout() {
  // Screeb deep links (screeb-* scheme, declared in app.json) — editor,
  // survey and message links open in-app.
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) Screeb.handleDeepLink(url);
    });
    const subscription = Linking.addEventListener("url", ({ url }) =>
      Screeb.handleDeepLink(url),
    );
    return () => subscription.remove();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </>
  );
}
