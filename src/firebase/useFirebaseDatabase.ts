import { db } from './FirebaseConfig';
import { Task } from './TaskInterface';
import { useState, useEffect, useContext } from 'react';
import { notification } from 'antd';
import { UserContext } from '../context/UserContext';
const useFirebaseDatabase = (collection = "tasks") => {
    const [firebaseDocuments, setFirebaseDocuments] = useState<Array<Task>>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getAll();
    }, []);

    const save = (values: Task) => {
        values.userId = user?.uid;
        return db.collection(collection).doc().set(values).then((result) => {
            notification.info({ message: "ok guardado" });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error" });
        });;
    }

    const getAll = () => {
        setLoading(true);
        return db.collection(collection)
            .where("userId", "==", user?.uid)
            .onSnapshot(querySnapshot => {
                const firebaseCollectionData: Array<Task> = [];
                querySnapshot.forEach(firebaseDoc => {
                    const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                    firebaseCollectionData.push(doc);
                });
                setFirebaseDocuments(firebaseCollectionData);
                setLoading(false);
            });
    };

    const deleteTask = (id: string) => {
        db.collection(collection).doc(id).delete().then((result) => {
            notification.success({ message: "ok eliminado" });
        })
    }

    const update = (documentId: string, task: Task) => {
        return db.collection(collection).doc(documentId).update(task);
    };

    return {
        save,
        getAll,
        deleteTask,
        update,
        loading,
        documents: firebaseDocuments
    }
}

export default useFirebaseDatabase;