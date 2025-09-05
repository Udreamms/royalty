const admin = require('firebase-admin');

// ¡ESTA ES LA PARTE NUEVA!
// Le decimos al script que cargue el archivo de la llave maestra para autenticarse.
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Función genérica para migrar todos los documentos de una colección a otra.
 * @param {string} oldCollectionName - Nombre de la colección de origen.
 * @param {string} newCollectionName - Nombre de la colección de destino.
 */
async function migrateCollection(oldCollectionName, newCollectionName) {
    console.log(`🚀 Iniciando migración de '${oldCollectionName}' a '${newCollectionName}'...`);
    const oldCollectionRef = db.collection(oldCollectionName);
    const newCollectionRef = db.collection(newCollectionName);
    
    const snapshot = await oldCollectionRef.get();

    if (snapshot.empty) {
        console.log(`✅ No se encontraron documentos en '${oldCollectionName}'. No hay nada que migrar.`);
        return;
    }

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        const newDocRef = newCollectionRef.doc(doc.id);
        batch.set(newDocRef, doc.data());
    });
    await batch.commit();
    console.log(`👍 ${snapshot.size} documentos copiados exitosamente a '${newCollectionName}'.`);

    const deleteBatch = db.batch();
    snapshot.docs.forEach(doc => {
        deleteBatch.delete(doc.ref);
    });
    await deleteBatch.commit();
    console.log(`🗑️ Colección antigua '${oldCollectionName}' eliminada.`);
    console.log(`✨ Migración de '${oldCollectionName}' a '${newCollectionName}' completada.`);
}

/**
 * Función principal que orquesta todas las migraciones.
 */
async function main() {
    console.log("--- INICIO DEL SCRIPT DE MIGRACIÓN DE DATOS DEL CRM ---");
    await migrateCollection('prospects', 'opportunities');
    await migrateCollection('bots', 'workflows');
    console.log("--- FIN DEL SCRIPT DE MIGRACIÓN ---");
    process.exit(0);
}

main().catch(error => {
    console.error("❌ Ocurrió un error crítico durante la migración:", error);
    process.exit(1);
});

