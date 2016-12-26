var localStorageCache = [];
var localStorageEnabled = null;
var localStorageDebug = false;

/** Get a value in localStorage for a key */
function localStorageGetItem(key) {
    if (localStorageDebug)
        console.log("STORAGE WRAPPER: get key=" + key);

    if (localStorageEnabled === null) {
        isLocalStorageEnabled();
    }

    if (localStorageEnabled === false) {
        if (key in localStorageCache) {
            return localStorageCache[key];
        } else {
            return null;
        }
    } else {
        return window.localStorage.getItem(key);
    }
}

/* Set a value for a key in localStorage */
function localStorageSetItem(key, value) {
    if (localStorageDebug) {
        console.log("STORAGE WRAPPER: set key=" + key + " value=" + value);
    }

    if (localStorageEnabled === null) {
        isLocalStorageEnabled();
    }

    if (localStorageEnabled === false) {
        return (localStorageCache[key] = value);
    } else {
        return window.localStorage.setItem(key, value);
    }
}

/** Clear localStorage */
function localStorageClear() {
    if (localStorageDebug) {
        console.log("STORAGE WRAPPER: clear");
    }

    if (localStorageEnabled === false) {
        localStorageCache = [];
    } else {
        window.localStorage.clear();
    }
}

/** Check if localStorage can be used for saving contacts or not */
function isLocalStorageEnabled() {
    try {
        window.localStorage.setItem("__test", "data");
    } catch (e) {
        // if (/QUOTA_?EXCEEDED/i.test(e.name)) {
        if (localStorageDebug) {
            console.log("STORAGE WRAPPER: test failed => " + e.name);
        }

        localStorageEnabled = false;

        alert("LocalStorage is disabled because of private browsing. You will have to log in again after closing the app.");

        return false;
        // }
    }

    if (localStorageDebug) {
        console.log("STORAGE WRAPPER: test successfull.");
    }

    localStorageEnabled = true;

    return true;
}