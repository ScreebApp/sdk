import * as Screeb from "@screeb/react-native";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

const initScreeb = async () => {
	Screeb.initSdk(
		"0e2b609a-8dce-4695-a80f-966fbfa87a88",
		"react-native@screeb.app",
		{
			logged_at_2: new Date(),
			// 'isConnected': false,
			// 'age': 29,
			// 'product': 'iPhone 13',
			// 'email': 'e2e@screeb.app',
		},
		{
			version: "1.0.0",
			onReady: (payload: unknown) => {
				console.log("onReady", payload);
			},
			onSurveyDisplayAllowed: (payload: unknown) => {
				console.log("onSurveyDisplayAllowed", payload);
				return true;
			},
		},
		{},
	);
};

export default function App() {
	const [output, setOutput] = useState<string>("");

	useEffect(() => {
		initScreeb();
	}, []);

	const runDebug = async () => {
		const result = await Screeb.debug();
		setOutput(result);
	};

	const runDebugTargeting = async () => {
		const result = await Screeb.debugTargeting();
		setOutput(result);
	};

	const runGetIdentity = async () => {
		const result = await Screeb.getIdentity();
		setOutput(JSON.stringify(result, null, 2));
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.sectionTitle}>Screeb demo app</Text>
				<View style={styles.space} />
				<Button title="Init SDK" onPress={() => initScreeb()} />
				<View style={styles.space} />
				<Button
					title="Set identity"
					onPress={() =>
						Screeb.setIdentity("react-user@screeb.app", {
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Set visitor properties"
					onPress={() =>
						Screeb.setProperties({
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Assign group"
					onPress={() =>
						Screeb.assignGroup(null, "Apple", {
							age: null,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Unassign group"
					onPress={() =>
						Screeb.unassignGroup(null, "Apple", {
							age: null,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Reset identity"
					onPress={() => Screeb.resetIdentity()}
				/>
				<View style={styles.space} />
				<Button title="Get identity" onPress={runGetIdentity} />
				<View style={styles.space} />
				<Button
					title="Track event"
					onPress={() =>
						Screeb.trackEvent("ReactModuleEvent", {
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Track screen"
					onPress={() =>
						Screeb.trackScreen("ReactModuleScreen", {
							isConnected: false,
							age: 29,
							product: "iPhone 13",
						})
					}
				/>
				<View style={styles.space} />
				<Button
					title="Start survey"
					onPress={() =>
						Screeb.startSurvey(
							"1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff",
							true,
							null,
							true,
							{
								version: "1.0.0",
								onSurveyShowed: (payload: string) => {
									console.log("onSurveyShowed", payload);
									return null;
								},
							},
						)
					}
				/>
				<View style={styles.space} />
				<Button
					title="Start message"
					onPress={() =>
						Screeb.startMessage(
							"642929b9-28f1-4cb5-b153-f482777e0003",
							true,
							null,
							true,
							{
								version: "1.0.0",
								onSurveyShowed: (payload: string) => {
									console.log("onSurveyShowed", payload);
									return null;
								},
							},
						)
					}
				/>
				<View style={styles.space} />
				<Button
					title="Session replay start"
					onPress={() => Screeb.sessionReplayStart()}
				/>
				<View style={styles.space} />
				<Button
					title="Session replay stop"
					onPress={() => Screeb.sessionReplayStop()}
				/>
				<View style={styles.space} />
				<Button title="Debug SDK" onPress={runDebug} />
				<View style={styles.space} />
				<Button title="Debug targeting" onPress={runDebugTargeting} />
				<View style={styles.space} />
				<Button title="Close SDK" onPress={() => Screeb.closeSdk()} />
				<View style={styles.space} />
				<Text style={styles.output}>{output}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "600",
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: "400",
	},
	highlight: {
		fontWeight: "700",
	},
	space: {
		width: 20,
		height: 20,
	},
	output: {
		width: "90%",
		fontSize: 12,
	},
});
