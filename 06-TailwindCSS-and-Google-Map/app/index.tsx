import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-5xl bg-slate-500 px-2 pt-3 rounded border">TailwindCSS</Text>
    </View>
  );
}
