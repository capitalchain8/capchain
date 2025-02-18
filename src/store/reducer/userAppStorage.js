import { LOG_ADMIN_IN, LOGIN_ADMIN, LOG_USER_IN, LOGIN_USER, MODIFY_WATCHLIST, ADD_ID, LOGOUT, LOAD_COINS, GET_THEME } from "../action/userAppStorage";


/*
let user = {
    currentWallet: {
        address: '14RXkB6nzquZb65wnJQZUwymLRVonckuRC',
        id: 'bitcoin',
        symbol: 'btc',
        url: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
    },
    _id: "643b62cb3a0d3f9e6dc4c53b",
    firstName: 'MERCY',
    lastName: 'SAGAY',
    email: 'mercysagay3@gmail.com',
    password: '8573800',
    emailVerified: true,
    numberVerified: true,
    accountBalance: '0',
    watchList: ['ethereum'],

    isFrontIdVerified: false,
    isBackIdVerified: false,
    isPayVerified: false,
    isTaxCodeVerified: false,
    isTntCodeVerified: false,
    isUstCodeVerified: false,
    isKtcCodeVerified: false,
    isFbiCodeVerified: false,
    status: false,
    taxCode: 895040,
    tntCode: 400323,
    ustCode: 678593,
    ktcCode: 900151,
    fbiCode: 463291,
    isRequiredPin: true,
    isHideBalance: false,
    notifications: [
        "643b728cdf60d1a4a306cb7a"
    ],
    transactions: [],
    personalAssets: [],
    personalAssetsAddresses: [],
    __v: 3,
    country: 'Nigeria',
    number: '+2349071991647',
    AddressOne: 'ffffff',
    NameOfBank: 'dfgdfd',
    accountNumber: '44434',
    cardNumber: '77888888',
    cvc: '565',
    expiration: '5655',
    nameOnCard: 'gojk',
    postalCode: '45654',
    pin: 8573
}
*/



const initialState = {
    adminToken: "",
    //expiresIn: "",
    admin: null,
    //user session credentials
    userToken: '',
    user: null,
    notifications: [],
    assetList: [],
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',

    },

}



export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_ADMIN_IN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.adminToken
            }

        case LOGIN_ADMIN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.adminToken
            }


        case LOG_USER_IN:
            return {
                ...state,
                user: action.payload.admin,
                userToken: action.payload.userToken,
                notifications: action.payload.notification
            }

        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.token,
                notifications: action.payload.notification
            }

        case MODIFY_WATCHLIST:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload
                }
            }
            break;


        case ADD_ID:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload,
                }
            }
            break;
        case LOGOUT:
            return {
                ...state,
                userToken: '',
                user: null
            }
            break;

        case LOAD_COINS:
            return {
                ...state,
                assetList: action.payload

            }

        case GET_THEME:
            return {
                ...state,
                color: action.payload
            }


        default:
            return state
    }

}

