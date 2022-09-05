import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {WHITE, SWISS_RED, GOLD_YELLOW} from "../styles/Colors";
import Context from "../context/Context";
import {useNavigation} from "@react-navigation/native";
import ClockIcon from "react-native-vector-icons/Fontisto";
import CheckIcon from "react-native-vector-icons/Ionicons";
import PlusIcon from "react-native-vector-icons/AntDesign";
import SearchIcon from "react-native-vector-icons/Feather";
import {BOLD} from "../styles/Fonts";
import {Icon, InputComp, Todos} from "../components/Reuse";
import {Loading} from "../components/Others";
import {getAllTodos} from "../functions/FBDB";

export default function Home({route}) {
	const [todos, setTodos] = useState([]);
	const {user} = useContext(Context);
	const [searchText, setSearchText] = useState("");
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	async function getTodos(clear) {
		await setLoading(true);
		setTodos([]);
		let searchtxt = clear == "clear" ? "" : searchText;
		await getAllTodos(null, searchtxt).then(async (response) => {
			setTodos(response.todos);
			setLoading(false);
		});
	}
	useEffect(() => {
		getTodos();
	}, []);

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
			<View style={{flex: 1, paddingHorizontal: 15}}>
				<StatusBar
					backgroundColor="transparent"
					barStyle="dark-content"
				/>
				<Text style={styles.titleText}>Todos</Text>
				<TopContent />
				<Text style={styles.totalText}>Total : {todos.length}</Text>
				<SearchComp
					value={searchText}
					onChangeText={setSearchText}
					onClear={async () => getTodos("clear")}
					onSearch={getTodos}
				/>
				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: 1,
						paddingTop: 10,
					}}
					showsVerticalScrollIndicator={false}
				>
					{todos.map((item, i) => (
						<Todos key={i} item={item} navigation={navigation} />
					))}
					{loading && <Loading />}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const TopContent = () => {
	const navigation = useNavigation();
	const {navigate} = navigation;

	return (
		<View style={[styles.topContainer, styles.flexStyle]}>
			<Text style={styles.todoriz}>TO-Do Riz</Text>
			<View style={styles.flexStyle}>
				<Icon
					value={<ClockIcon name="clock" size={18} />}
					click={() => navigate("Focus")}
				/>
				<Icon
					value={<CheckIcon name="checkmark-done" size={18} />}
					click={() => navigate("check")}
				/>
				<Icon
					value={<PlusIcon name="plus" size={18} />}
					click={() => navigate("AddTask")}
				/>
			</View>
		</View>
	);
};

const SearchComp = ({value, onChangeText, onClear, onSearch}) => (
	<View style={[styles.flexStyle, styles.topContainer, {marginTop: 12}]}>
		<InputComp
			placeholder="Search To do"
			extraStyle={{
				width: "67%",
				backgroundColor: WHITE,
				elevation: 3,
			}}
			value={value}
			onChangeText={onChangeText}
		/>
		<View style={styles.flexStyle}>
			<Icon
				value={<SearchIcon name="search" size={18} />}
				extrabtnStyle={styles.extrabtnStyle}
				click={onSearch}
			/>
			<Icon
				value="Clear"
				extrabtnStyle={styles.extrabtnStyle}
				click={onClear}
			/>
		</View>
	</View>
);

const styles = StyleSheet.create({
	titleText: {
		textAlign: "center",
		marginTop: 5,
		marginBottom: 10,
		fontSize: 22,
		fontFamily: BOLD,
	},
	flexStyle: {
		flexDirection: "row",
		alignItems: "center",
	},
	topContainer: {
		justifyContent: "space-between",
		marginBottom: 8,
	},
	todoriz: {
		fontSize: 22,
		letterSpacing: 1,
		fontFamily: BOLD,
		color: GOLD_YELLOW,
	},

	totalText: {
		color: SWISS_RED,
		fontSize: 17,
		fontFamily: BOLD,
		borderBottomColor: SWISS_RED,
		borderBottomWidth: 2,
		height: 28,
	},

	extrabtnStyle: {
		borderRadius: 5,
		width: 40,
	},
});
