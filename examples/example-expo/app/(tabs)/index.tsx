import * as Screeb from "@screeb/react-native";
import { useEffect } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const PROJECT_TOKEN = "0e2b609a-8dce-4695-a80f-966fbfa87a88";
const RESPONDENT_ID = "0021de43-6e44-443c-9903-2ab99f9c4233";
const SURVEY_ID = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff";
const MESSAGE_ID = "642929b9-28f1-4cb5-b153-f482777e0003";

// Shared helper to run the Screeb setup with demo identifiers that work in preview environments.
const initScreeb = async () => {
	try {
		await Screeb.initSdk(
			PROJECT_TOKEN,
			RESPONDENT_ID,
			{
				premium: true,
				locale: "fr-FR",
			},
			{
				version: "1.0.0",
				onReady: (payload: unknown) => {
					console.log("Screeb ready", payload);
				},
				onSurveyDisplayAllowed: () => {
					console.log("Survey display allowed");
					return true;
				},
			},
			{},
		);
	} catch (error) {
		console.error("Failed to init Screeb", error);
		Alert.alert("Screeb init failed", "Check the Metro logs for details.");
	}
};

export default function HomeScreen() {
	useEffect(() => {
		initScreeb();
	}, []);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
			headerImage={<View style={styles.headerSpacer} />}
		>
			<ThemedView style={styles.section}>
				<ThemedText type="title">@screeb/react-native + Expo</ThemedText>
				<ThemedText>
					This screen boots the Screeb SDK when the component mounts and exposes
					the main helper methods below so you can try them quickly from an Expo
					development build.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.section}>
				<ThemedText type="subtitle">Try the SDK</ThemedText>
				<View style={styles.buttonList}>
					<Button title="Init SDK" onPress={() => initScreeb()} />
					<View style={styles.spacer} />
					<Button
						title="Set identity"
						onPress={() =>
							Screeb.setIdentity("expo-user@screeb.app", {
								premium: true,
								plan: "Pro",
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Set visitor properties"
						onPress={() =>
							Screeb.setProperties({
								premium: true,
								plan: "Pro",
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Assign group"
						onPress={() =>
							Screeb.assignGroup(null, "ExpoFans", {
								plan: "Pro",
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Unassign group"
						onPress={() =>
							Screeb.unassignGroup(null, "ExpoFans", {
								plan: "Pro",
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Reset identity"
						onPress={() => Screeb.resetIdentity()}
					/>
					<View style={styles.spacer} />
					<Button
						title="Get identity"
						onPress={async () => {
							const identity = await Screeb.getIdentity();
							console.log("Screeb identity", identity);
						}}
					/>
					<View style={styles.spacer} />
					<Button
						title="Track event"
						onPress={() =>
							Screeb.trackEvent("ExpoExampleEvent", {
								premium: true,
								plan: "Pro",
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Track screen"
						onPress={() =>
							Screeb.trackScreen("ExpoExampleScreen", {
								premium: true,
								plan: "Pro",
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Start survey"
						onPress={() =>
							Screeb.startSurvey(SURVEY_ID, true, null, true, {
								version: "1.0.0",
								onSurveyShowed: (payload: string) => {
									console.log("Survey displayed", payload);
									return null;
								},
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Start message"
						onPress={() =>
							Screeb.startMessage(MESSAGE_ID, true, null, true, {
								version: "1.0.0",
								onSurveyShowed: (payload: string) => {
									console.log("Message displayed", payload);
									return null;
								},
							})
						}
					/>
					<View style={styles.spacer} />
					<Button
						title="Session replay start"
						onPress={() => Screeb.sessionReplayStart()}
					/>
					<View style={styles.spacer} />
					<Button
						title="Session replay stop"
						onPress={() => Screeb.sessionReplayStop()}
					/>
					<View style={styles.spacer} />
					<Button title="Debug SDK" onPress={() => Screeb.debug()} />
					<View style={styles.spacer} />
					<Button
						title="Debug targeting"
						onPress={() => Screeb.debugTargeting()}
					/>
					<View style={styles.spacer} />
					<Button title="Close SDK" onPress={() => Screeb.closeSdk()} />
				</View>
			</ThemedView>
			<ThemedView style={styles.section}>
				<ThemedText>
					Run `npm run example:expo --workspace=@screeb/react-native` from the root, then rebuild the native app with `npm run prebuild --workspace=example-expo` followed by `npm run ios --workspace=example-expo` or `npm run android --workspace=example-expo` to keep the Screeb TurboModule available inside Expo.
				</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerSpacer: {
		height: 160,
	},
	section: {
		gap: 12,
	},
	buttonList: {
		alignSelf: "stretch",
		width: "100%",
	},
	spacer: {
		height: 16,
	},
});
