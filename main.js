import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyBoQovSZfN-IWxwE6SNigeVFl7EyoGo6I8",
  authDomain: "insan-cemerlang-bf3bc.firebaseapp.com",
  projectId: "insan-cemerlang-bf3bc",
  storageBucket: "insan-cemerlang-bf3bc.appspot.com",
  messagingSenderId: "97027282334",
  appId: "1:97027282334:web:f8b63d43a947098d3df28f",
  measurementId: "G-TJFSY9D8R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// tambahkan fungsi untuk menampilkan daftar todo list
export async function ambilDaftarTodoList() {
  const refDokumen = collection(basisdata, "todoList");
  const kueri = query(refDokumen, orderBy("teks")); // urutkan berdasarkan teks, bisa disesuaikan

  try {
    const cuplikanKueri = await getDocs(kueri);
    const hasilKueri = cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      teks: dokumen.data().teks,
      status: dokumen.data().status
    }));

    return hasilKueri;
  } catch (error) {
    console.error("Gagal mengambil daftar todo list:", error);
    return [];
  }
}

export async function tambahTodoList(teks, status) {
  try {
    // menyimpan data ke firebase
    await addDoc(collection(basisdata, "todoList"), {
      teks: teks,
      status: status//bisa "belum" "proses", atau "selesai"
    });

    console.log("Berhasil menyimpan data todo list");
  } catch (error) {
    console.log("Gagal menyimpan data todo list", error);
  }
}