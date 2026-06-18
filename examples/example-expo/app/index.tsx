import * as Screeb from "@screeb/react-native";
import { useEffect } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PROJECT_TOKEN = "0e2b609a-8dce-4695-a80f-966fbfa87a88";
const RESPONDENT_ID = "0021de43-6e44-443c-9903-2ab99f9c4233";
const SURVEY_ID = "8dd42ae1-f716-429c-9843-fad62adf2ac4";
const USER_PROPERTIES = {
  locale: "fr-FR",
  premium: true,
};

const initScreeb = async () => {
  try {
    await Screeb.initSdk(
      PROJECT_TOKEN,
      RESPONDENT_ID,
      USER_PROPERTIES,
      {
        onReady: (payload: unknown) => {
          console.log("Screeb ready", payload);
        },
        onSurveyDisplayAllowed: () => {
          console.log("Survey display allowed");
          return true;
        },
        version: "1.0.0",
      },
      {},
    );
  } catch (error) {
    console.error("Failed to init Screeb", error);
    Alert.alert("Screeb init failed", "Check the Metro logs for details.");
  }
};

export default function ScreebExpoExample() {
  useEffect(() => {
    initScreeb();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>@screeb/react-native + Expo</Text>
      <Text style={styles.description}>
        Minimal Expo development build for exercising the Screeb React Native
        wrapper.
      </Text>

      <View style={styles.buttonList}>
        <Button title="Init SDK" onPress={() => initScreeb()} />
        <Button title="Close SDK" onPress={() => Screeb.closeSdk()} />
        <Button
          title="Set identity"
          onPress={() =>
            Screeb.setIdentity("expo-user@screeb.app", {
              plan: "Pro",
              premium: true,
            })
          }
        />
        <Button
          title="Track event"
          onPress={() =>
            Screeb.trackEvent("ExpoExampleEvent", {
              plan: "Pro",
              premium: true,
            })
          }
        />
        <Button
          title="Track screen"
          onPress={() =>
            Screeb.trackScreen("ExpoExampleScreen", {
              plan: "Pro",
              premium: true,
            })
          }
        />
        <Button
          title="Set visitor properties"
          onPress={() =>
            Screeb.setProperties({
              plan: "Pro",
              premium: true,
            })
          }
        />
        <Button
          title="Start survey"
          onPress={() =>
            Screeb.startSurvey(SURVEY_ID, true, null, true, {
              onSurveyShowed: (payload: string) => {
                console.log("Survey displayed", payload);
                return null;
              },
              version: "1.0.0",
            })
          }
        />
        <Button
          title="Assign group"
          onPress={() =>
            Screeb.assignGroup(null, "ExpoFans", {
              plan: "Pro",
            })
          }
        />
        <Button
          title="Unassign group"
          onPress={() =>
            Screeb.unassignGroup(null, "ExpoFans", {
              plan: "Pro",
            })
          }
        />
        <Button title="Debug" onPress={() => Screeb.debug()} />
        <Button title="Debug targeting" onPress={() => Screeb.debugTargeting()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonList: {
    gap: 12,
  },
  content: {
    gap: 18,
    padding: 24,
    paddingTop: 72,
  },
  description: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 22,
  },
  title: {
    color: "#0f172a",
    fontSize: 24,
    fontWeight: "700",
  },
});
