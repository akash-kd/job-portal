import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: 'AIzaSyAgr49Nshf_wG4PO-3kPXdNO8WiZXb3Ukk',
    authDomain: 'project-728ff.firebaseapp.com',
    projectId: 'project-728ff',
    storageBucket: 'project-728ff.appspot.com',
    messagingSenderId: '453856153100',
    appId: '1:453856153100:web:01d1b20b71840bb29a6829',
    measurementId: 'G-KQLR7GBG3H',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)
