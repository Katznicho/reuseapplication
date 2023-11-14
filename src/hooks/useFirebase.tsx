import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser, registerUser, setAppIntro, updateAppIntro, updateIsLoggedIn, updateUserProfile } from '../redux/store/slices/UserSlice';
import { APP_USERS, PAYMENT_STATUS, PRODUCT_COLLECTION } from '../utils/constants/constants';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';

const USER_COLLECTION = "users";
const CATEGORY_COLLECTION = "categories";
const PAYMENT_COLLECTION = "payments";
//notification
const NOTIFICATION_COLLECTION = "notifications";

const notificationStatus = {
  UNREAD: 'unread',
  READ: 'read',
}

export const useFirebase = () => {
  const dispatch = useDispatch<any>();

  // Function to get the current logged-in user
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth().onAuthStateChanged(async (user) => {
        if (!user) {
          unsubscribe();
          resolve(null);
        }
        else {
          let userUid = user.uid;
          const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
          if (userDoc.exists) {
            const user = userDoc.data();
            dispatch(setAppIntro());
            dispatch(loginUser({
              UID: userUid,
              fname: user?.firstName,
              lname: user?.lastName,
              email: user?.email,
              username: user?.username,
              community: user?.community,
              isVerified: false,
              phone: '',
              displayPicture: '',
              reuseType: ''
            }))

          }
          unsubscribe();
          resolve(user);
        }

      });
    });
  };


  const register = async (email: string, password: string, username: string, firstName: string, lastName: string, userType: String, communityName: string) => {
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
      const userUid = userCredentials.user.uid;

      // Store additional user details in the "users" collection
      if (userType == APP_USERS.RECEIVER) {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: email,
          username: username,
          userType: userType,
          communityName: communityName,
          firstName: "",
          lastName: "",
        });
        dispatch(registerUser({
          UID: userUid,
          fname: "",
          lname: "",
          email: email,
          username: username,
          community: communityName,
          isVerified: false,
          phone: '',
          displayPicture: '',
          reuseType: ''
        }))
      }
      else {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: email,
          username: username,
          userType: userType,
          firstName: firstName,
          lastName: lastName,
          community: "",
        });
      }

      dispatch(updateIsLoggedIn(true));
      dispatch(updateAppIntro(false));


      return userCredentials.user;

    } catch (error) {
      return error;
    }
  }


  const signUpWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true
    })
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredentials = await auth().signInWithCredential(googleCredential);
      const userUid = userCredentials.user.uid;
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
      if (userDoc.exists) {
        const user = userDoc.data();
        dispatch(setAppIntro());
        dispatch(loginUser({
          UID: userUid,
          fname: user?.firstName,
          lname: user?.lastName,
          email: user?.email,
          username: user?.username,
          community: user?.community,
          isVerified: false,
          phone: '',
          displayPicture: '',
          reuseType: ''
        }))
      }
      // setState({ userInfo });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  

  const login = async (email: string, password: string) => {
    try {
      let userCredentails = await auth().signInWithEmailAndPassword(email, password);
      const userUid = userCredentails.user.uid;
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
      if (userDoc.exists) {
        const user = userDoc.data();
        dispatch(setAppIntro());
        dispatch(loginUser({
          UID: userUid,
          fname: user?.firstName,
          lname: user?.lastName,
          email: user?.email,
          username: user?.username,
          community: user?.community,
          isVerified: false,
          phone: '',
          displayPicture: '',
          reuseType: ''
        }))
        dispatch(updateIsLoggedIn(true));

      }
      return { user: userCredentails.user };

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const logout = async () => {
    try {
      await auth().signOut();
      dispatch(logoutUser());
    } catch (error) {

    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      // Handle successful password reset request
      // For example:
      // dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });

    } catch (error) {
      console.log(error);
    }
  }

  const getUserDetails = async (userId: string) => {
    try {
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userId).get();
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        console.log("User not found.");
        return null;
      }

    } catch (error) {

      return error;
    }
  }

  const updateUserLocation = async (userId: string, latitude: string, longitude: string) => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {

      return error;
    }
  }

  const updateUserDeviceId = async (userId: string, deviceId: string) => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        deviceId: deviceId,
      });
    } catch (error) {
      throw error;
    }
  };

  const getUserDeviceId = async (userId: string) => {
    try {
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const deviceId = userData?.deviceId; // Replace 'deviceId' with the actual field name
        return deviceId;
      } else {
        console.error('User document not found.');
        return null;
      }
    } catch (error) {
      console.error('Error getting user device ID:', error);
      throw error;
    }
  };




  const updateUserProfilePreferences = async (userId: string, reuser: string, gender: string, preferences: string[]): Promise<boolean | null> => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        gender: gender,
        reuser: reuser,
        preferences: preferences,
      });
      dispatch(updateUserProfile({
        gender,
        preferences,
        reuser
      }))

      return true;


    } catch (error) {

      return null;
    }
  };

  const createDonationProduct = async (userId: string, product: any) => {
    try {
      await firestore().collection(PRODUCT_COLLECTION).add({
        ...product,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        rating: 4,
        userId: userId,
        paymentStatus: PAYMENT_STATUS.UNPAID
      });
    } catch (error) {
      console.log("Error updating user credentials:", error);
      return error;
    }
  };

  const getAllProducts = async () => {
    try {
      const querySnapshot = await firestore().collection(PRODUCT_COLLECTION).get();
      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });


      return products;
    } catch (error) {
      throw error;
    }
  };

  //update product payment status
  const updateProductPaymentStatus = async (productId: string, status: string, paymentId: string) => {
    try {
      await firestore().collection(PRODUCT_COLLECTION).doc(productId).update({
        paymentStatus: status,
        paymentId: paymentId
      });
    } catch (error) {
      console.error('Error updating product payment status:', error);
      throw error;
    }
  };

  const getAllCategories = async () => {
    try {
      const querySnapshot = await firestore().collection(CATEGORY_COLLECTION).get();
      const categories: any = [];
      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const data = documentSnapshot.data();
        // Include the document ID as part of the product data
        categories.push({ id: documentSnapshot.id, ...data });
      });
      return categories;

    } catch (error) {
      throw error;

    }



  }


  const getAllUsers = async () => {
    try {
      const querySnapshot = await firestore().collection(USER_COLLECTION).get();
      const users: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const userData = documentSnapshot.data();
        // Include the document ID as part of the product data
        users.push({ id: documentSnapshot.id, ...userData });
      });

      return users;
    } catch (error) {
      throw error;
    }
  };

  const getAllDonors = async () => {
    try {
      const querySnapshot = await firestore()
        .collection(USER_COLLECTION)
        .where('userType', '==', APP_USERS.DONOR)
        .get();

      const donors: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each user document
        const userData = documentSnapshot.data();
        // Include the document ID as part of the user data
        donors.push({ id: documentSnapshot.id, ...userData });
      });

      return donors;
    } catch (error) {

      throw error;
    }
  };



  /**
   * Retrieves all communities from the firestore database.
   *
   * @return {Array} An array of community objects.
   */
  /**
   * Retrieves all communities from the firestore database.
   *
   * @return {Array} An array of community objects.
   */
  const getAllCommunities = async (): Promise<any[]> => {
    try {
      const querySnapshot = await firestore()
        .collection(USER_COLLECTION)
        .where('userType', '==', APP_USERS.RECEIVER)
        .get();

      const communities: any[] | PromiseLike<any[]> = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each community document
        const communityData = documentSnapshot.data();
        // Include the document ID as part of the community data
        communities.push({ id: documentSnapshot.id, ...communityData });
      });

      return communities;
    } catch (error) {
      throw error;
    }
  };





  const getUserByUid = async (uid: any): Promise<any> => {
    try {
      const userDoc = await firestore()
        .collection(USER_COLLECTION)
        .doc(uid)
        .get();

      if (userDoc.exists) {
        // User document found, return its data
        return { id: userDoc.id, ...userDoc.data() };
      } else {
        // User document not found
        return null;
      }
    } catch (error) {
      throw error;
    }
  };



  const getProductsByUserId = async (userId: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where('userId', '==', userId) // Replace 'userId' with the actual field name
        .get();

      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });

      return products;
    } catch (error) {
      console.error('Error getting products by user ID:', error);
      throw error;
    }
  };

  //get products by user id and status
  const getProductsByUserIdAndStatus = async (userId: string, status: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where('userId', '==', userId)
        .where('status', '==', status)
        .get();

      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });

      return products;
    } catch (error) {
      console.error('Error getting products by user ID and status:', error);
      throw error;
    }
  };

  //get payments by user id and status
  const getPaymentsByUserIdAndStatus = async (userId: string, status: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(PAYMENT_COLLECTION)
        .where('userId', '==', userId)
        .where('status', '==', status)
        .get();

      const payments: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each payment document
        const paymentData = documentSnapshot.data();
        // Include the document ID as part of the payment data
        payments.push({ id: documentSnapshot.id, ...paymentData });
      });

      return payments;
    } catch (error) {
      console.error('Error getting payments by user ID and status:', error);
      throw error;
    }
  };

  //store the payment details
  const storePaymentDetails = async (paymentDetails: any, transactionRef: string) => {
    try {
      await firestore().collection(PAYMENT_COLLECTION).doc(transactionRef).set({
        ...paymentDetails,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    } catch (error) {
      console.error('Error storing payment details:', error);
      throw error;
    }
  };

  //update payment status
  const updatePaymentStatus = async (paymentId: string, status: string) => {
    try {
      await firestore().collection(PAYMENT_COLLECTION).doc(paymentId).update({
        status: status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  };

  //create a notification
  const createNotification = async (userId: string, notification: any) => {
    try {
      await firestore().collection(NOTIFICATION_COLLECTION).add({
        ...notification,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId,
        isRead: false,
        status: notificationStatus.UNREAD,
        isAdminRead: false
      });
    } catch (error) {
      console.log("Error creating notification:", error);
    }
  }

  //get all notifications for a user
  const getAllNotifications = async (userId: string) => {

    try {
      const querySnapshot = await firestore()
        .collection(NOTIFICATION_COLLECTION)
        .where('userId', '==', userId)
        .get();

      const notifications: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each notification document
        const notificationData = documentSnapshot.data();
        // Include the document ID as part of the notification data
        notifications.push({ id: documentSnapshot.id, ...notificationData });
      });

      return notifications;
    } catch (error) {
      throw error;
    }
  }

  //get all unread notifications
  const getAllUnreadNotifications = async (userId: string) => {

    try {
      const querySnapshot = await firestore()
        .collection(NOTIFICATION_COLLECTION)
        .where('userId', '==', userId)
        .where('status', '==', notificationStatus.UNREAD)
        .get();

      const notifications: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each notification document
        const notificationData = documentSnapshot.data();
        // Include the document ID as part of the notification data
        notifications.push({ id: documentSnapshot.id, ...notificationData });
      });

      return notifications;
    } catch (error) {
      throw error;
    }
  }

  //update notification
  const updateNotification = async (notificationId: string, status: string) => {

    try {
      await firestore().collection(NOTIFICATION_COLLECTION).doc(notificationId).update({
        status: notificationStatus.READ,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        isRead: true
      });
    } catch (error) {
      throw error;
    }
  }


  return {
    register,
    login,
    forgotPassword,
    getUserDetails,
    getCurrentUser,
    updateUserProfilePreferences,
    logout,
    updateUserLocation,
    createDonationProduct,
    getAllProducts,
    getProductsByUserId,
    getAllUsers,
    getUserByUid,
    getAllDonors,
    getAllCategories,
    getUserDeviceId,
    updateUserDeviceId,
    getAllCommunities,
    //notifications
    createNotification,
    updateNotification,
    getAllNotifications,
    getAllUnreadNotifications,
    getProductsByUserIdAndStatus,
    getPaymentsByUserIdAndStatus,
    updateProductPaymentStatus,
    storePaymentDetails,
    updatePaymentStatus
    //notifications

    // Export other auth functions here if needed
  };
}
