import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	startAfter,
	where,
} from "firebase/firestore";
import {auth, db} from "../config/firebase";

export const addUserToFB = async (info, id) => {
	await setDoc(doc(db, "Users", id), info);
};

export const addTaskToFB = async (info, id) => {
	if (id) {
		await setDoc(doc(db, "Task", id), info);
	} else {
		await addDoc(collection(db, "Task"), info);
	}
};

export const addContributorToFB = async (info, id) => {
	if (id) {
		await setDoc(doc(db, "Contributors", id), info);
	} else {
		await addDoc(collection(db, "Contributors"), info);
	}
};

export const addArticleToFB = async (info, id) => {
	if (id) {
		await setDoc(doc(db, "Articles", id), info);
	} else {
		await addDoc(collection(db, "Articles"), info);
	}
};
export const addArtworkToFB = async (info, id) => {
	if (id) {
		await setDoc(doc(db, "Artworks", id), info);
	} else {
		await addDoc(collection(db, "Artworks"), info);
	}
};
export const addEventToFB = async (info, id) => {
	if (id) {
		await setDoc(doc(db, "Events", id), info);
	} else {
		await addDoc(collection(db, "Events"), info);
	}
};

export const getSingleUserInfo = (setMyInfo) => {
	const userRef = collection(db, "Users");
	const q = query(userRef, where("uid", "in", [auth.currentUser.uid]));
	onSnapshot(q, (querySnapshot) => {
		let mydata = {};
		querySnapshot.forEach((doc) => {
			mydata = doc.data();
		});
		setMyInfo(mydata);
	});
};

export const getCurrentUser = async () => {
	const userRef = doc(db, "Users", auth.currentUser.uid);
	const userSnap = await getDoc(userRef);
	let user;
	if (userSnap.exists()) {
		user = userSnap.data();
	} else {
		const artistRef = doc(db, "Users", auth.currentUser.uid);
		const artistSnap = await getDoc(artistRef);
		if (artistSnap.exists()) {
			user = artistSnap.data();
		} else {
			user = null;
		}
	}
	user && (user.id = auth.currentUser.uid);
	return user;
};
export const getArticles = async () => {
	return new Promise(async (resolve, reject) => {
		const first = query(
			collection(db, "Articles"),
			orderBy("published_at"),
			limit(25)
		);
		const documentSnapshots = await getDocs(first);
		let articles = [];
		documentSnapshots.forEach((doc) => {
			let article = {...doc.data(), id: doc.id};
			articles.push(article);
		});
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		const next = query(
			collection(db, "Articles"),
			orderBy("published_at"),
			startAfter(lastVisible),
			limit(25)
		);
		resolve({articles, next});
	});
};
export const getMyArticles = async (id) => {
	return new Promise(async (resolve, reject) => {
		const first = query(
			collection(db, "Articles"),
			where("id", "==", id),
			orderBy("published_at"),
			limit(25)
		);
		const documentSnapshots = await getDocs(first);
		let articles = [];
		documentSnapshots.forEach((doc) => {
			let article = {...doc.data(), id: doc.id};
			articles.push(article);
		});
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		const next = query(
			collection(db, "Articles"),
			where("id", "==", id),
			orderBy("published_at"),
			limit(25)
		);
		resolve({articles, next});
	});
};
export const getArtworks = async () => {
	return new Promise(async (resolve, reject) => {
		const first = query(
			collection(db, "Artworks"),
			orderBy("published_at"),
			limit(25)
		);
		const documentSnapshots = await getDocs(first);
		let artworks = [];
		documentSnapshots.forEach((doc) => {
			let artwork = {...doc.data(), id: doc.id};
			artworks.push(artwork);
		});
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		const next = query(
			collection(db, "Artworks"),
			orderBy("published_at"),
			limit(25)
		);
		resolve({artworks, next});
	});
};
export const getAllTodos = async (id, searchText) => {
	return new Promise(async (resolve, reject) => {
		const first = query(
			collection(db, "Task"),
			// where("user", "==", id),
			orderBy("added_at"),
			limit(25)
		);
		const documentSnapshots = await getDocs(first);
		let todos = [];
		documentSnapshots.forEach((doc) => {
			let todo = {...doc.data(), id: doc.id};
			if (searchText) {
				let res = JSON.stringify(todo)
					.toLowerCase()
					.search(searchText.toLowerCase());
				console.log(res, JSON.stringify(todo));
				if (res >= 0) {
					todos.push(todo);
				}
			} else {
				todos.push(todo);
			}
		});
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		const next = query(
			collection(db, "Task"),
			// where("user", "==", id),
			orderBy("added_at"),
			limit(25)
		);
		resolve({todos, next});
	});
};

// export const getMyLiked = async()=>{
//   const ref = doc(db, "Likes",auth.currentUser.uid);
//   const snap = await getDoc(ref);
//   let liked;
//   if (snap.exists()) {
//     let data = snap.data()
//     if(data.artworks){
//       liked = data.artworks
//     }
//   }
//   return liked
// }

export const likeArtwork = async (liked) => {
	await setDoc(
		doc(db, "Likes", auth.currentUser.uid),
		{artworks: liked},
		{merge: true}
	);
};
