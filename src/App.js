import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
//importing redux action to log user in initially
import { checkIfUserIsLoggedIn, checkIfAdminIsLoggedIn,getTheme} from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import FallBackComponent from './component/general/Fallback'
import { useSelector } from "react-redux";


//importing  Admin screens
const SignupScreen = React.lazy(() => import('./screen/admin_screen/AdminSignup'))
const LoginScreen = React.lazy(() => import('./screen/admin_screen/AdminLogin'))
const ResetPasswordScreen = React.lazy(() => import('./screen/user_screen/Auth/ResetPassword'))
const UpgradeScreen = React.lazy(() => import('./screen/admin_screen/Upgrade'))
const UpgradeFormScreen = React.lazy(() => import('./screen/admin_screen/UpgradeForm'))
const FundScreen = React.lazy(() => import('./screen/admin_screen/Fund'))
const FundFormScreen = React.lazy(() => import('./screen/admin_screen/FundForm'))
const AdminScreen = React.lazy(() => import('./screen/admin_screen/Admin'))
const AdminFormScreen = React.lazy(() => import('./screen/admin_screen/AdminForm'))
const UserForgetSecretKeyScreen = React.lazy(() => import('./screen/admin_screen/forgetSecretKey'))
const UserUpdateSecretKeyScreen = React.lazy(() => import('./screen/admin_screen/updateSecretKey'))


//User auth screens
const UserForgetPasswordScreen = React.lazy(() => import('./screen/user_screen/Auth/ForgetPassword'))
const EmailVerificationResult = React.lazy(() => import('./screen/user_screen/Auth/EmailVerifyResult'))
const PhoneSignup = React.lazy(() => import('./screen/user_screen/Auth/PhoneSignup'))
const EmailVerify = React.lazy(() => import('./screen/user_screen/Auth/EmailVerify'))
const UserSignup = React.lazy(() => import('./screen/user_screen/Auth/Signup'))
const EmailLogin = React.lazy(() => import('./screen/user_screen/Auth/EmailLogin'))
const PasswordLogin = React.lazy(() => import('./screen/user_screen/Auth/PasswordLogin'))
const ResetPassordScreen = React.lazy(() => import('./screen/user_screen/Auth/ResetPassword'))
const OptionNotification = React.lazy(() => import('./screen/user_screen/Auth/OptionNotification'))
const PhoneVerification = React.lazy(() => import('./screen/user_screen/Auth/PhoneVerification'))
const Card = React.lazy(() => import('./screen/user_screen/Auth/Card'))

const AddCard = React.lazy(() => import('./screen/user_screen/Auth/AddCard'))




{/*user dashbaoard section*/ }
const DashboardHome = React.lazy(() => import('./screen/user_screen/Dashboard/Home'))
const DashboardAsset = React.lazy(() => import('./screen/user_screen/Dashboard/Assets'))
const DashboardTrade = React.lazy(() => import('./screen/user_screen/Dashboard/Trade'))
const DashboardPay = React.lazy(() => import('./screen/user_screen/Dashboard/Pay'))
const DashboardChart = React.lazy(() => import('./screen/user_screen/Dashboard/TradeChart'))
const AssetList = React.lazy(() => import('./screen/user_screen/Dashboard/AssetList'))
const Recieve = React.lazy(() => import('./screen/user_screen/Dashboard/Recieve'))
const SendCrypto = React.lazy(() => import('./screen/user_screen/Dashboard/Send'))
const AssetAddress = React.lazy(() => import('./screen/user_screen/Dashboard/AssetAddress'))
const CryptoCalculator = React.lazy(() => import('./screen/user_screen/Dashboard/CryptoCalculator'))
const ExchangeCalculator = React.lazy(() => import('./screen/user_screen/Dashboard/ExchangeCalculator'))
const BankForm = React.lazy(() => import('./screen/user_screen/Auth/BankForm'))
const WalletForm = React.lazy(() => import('./screen/user_screen/Auth/WalletForm'))
const Earn = React.lazy(() => import('./screen/user_screen/Dashboard/Earn'))
const Notification = React.lazy(() => import("./screen/user_screen/Dashboard/Notifications"))
const Invite = React.lazy(() => import("./screen/user_screen/Dashboard/InviteFriends"))
const ExchangeList = React.lazy(() => import("./screen/user_screen/Dashboard/ExchangeList"))
const ProfileSetting = React.lazy(() => import('./screen/user_screen/Dashboard/ProfileSettings'))
const Limits = React.lazy(() => import('./screen/user_screen/Dashboard/Limits'))
const UpdateUserInfo = React.lazy(() => import('./screen/user_screen/Dashboard/Update'))
const Privacy = React.lazy(() => import('./screen/user_screen/Dashboard/Privacy'))
const ConfirmNewPhone = React.lazy(() => import('./screen/user_screen/Dashboard/ComfirmPhone'))
const TaxCode = React.lazy(() => import('./screen/user_screen/Dashboard/TaxCode'))
const Tntcode = React.lazy(() => import('./screen/user_screen/Dashboard/TntCode'))
const Ustcode = React.lazy(() => import('./screen/user_screen/Dashboard/UstCode'))

const Idverification = React.lazy(() => import('./screen/user_screen/Dashboard/Idverification'))

const FrontID = React.lazy(() => import('./screen/user_screen/Dashboard/FrontID'))
const BackID = React.lazy(() => import('./screen/user_screen/Dashboard/BackID'))
const ChangePin = React.lazy(() => import('./screen/user_screen/Dashboard/ChangePin'))
const Transactions = React.lazy(() => import("./screen/user_screen/Dashboard/Transaction"))
const Ktccode = React.lazy(() => import('./screen/user_screen/Dashboard/KtcCode'))










//importing from general screen
const Dogecoin = React.lazy(() => import('./screen/general_screen/Dogecoin'))
const Home = React.lazy(() => import('./screen/general_screen/Home'))
const Blockchain = React.lazy(() => import('./screen/general_screen/Blockchain'))
const CryptoCurrency = React.lazy(() => import("./screen/general_screen/Cryptocurrency"))
const Stablecoin = React.lazy(() => import("./screen/general_screen/Stablecoin"))
const Inflation = React.lazy(() => import("./screen/general_screen/Inflation"))
const Cefi = React.lazy(() => import("./screen/general_screen/Cefi"))
const Volatility = React.lazy(() => import('./screen/general_screen/Volatility'))
const Token = React.lazy(() => import('./screen/general_screen/Token'))
const Ethereum = React.lazy(() => import('./screen/general_screen/Etherium'))
const Bitcoin = React.lazy(() => import('./screen/general_screen/Bitcoin'))
const Policy = React.lazy(() => import('./screen/general_screen/policy'))
const LearnScreen = React.lazy(() => import('./screen/general_screen/Learn'))
const Send = React.lazy(() => import('./screen/general_screen/Send'))
const Tips = React.lazy(() => import('./screen/general_screen/TipsAndTutorial'))
const CryptoBasics = React.lazy(() => import('./screen/general_screen/CryptoBasics'))
const SupportScreen = React.lazy(() => import('./screen/general_screen/Support'))
const Appearance = React.lazy(() => import("./screen/user_screen/Dashboard/Appearance"))

const ChangePhone = React.lazy(() => import('./screen/user_screen/Dashboard/ChangePhone'))
const NewPhone = React.lazy(() => import('./screen/user_screen/Dashboard/NewPhone'))
const TopUpForm = React.lazy(() => import('./screen/user_screen/Dashboard/Top-up'))


function App() {
  let dispatch = useDispatch()
  let { user,color,admin} = useSelector(state => state.userAuth)


  let initialCalls = async()=>{
     await dispatch(checkIfUserIsLoggedIn())
     await dispatch(checkIfAdminIsLoggedIn())
     await dispatch(getTheme())
  }


  useEffect(() => {
    initialCalls()
  }, [])


  return (
    <div className = "App">
      <Suspense fallback={<FallBackComponent />} >
        <Routes>
          {/* Admin Routes*/}
          <Route path='/' element={<Home />} />
          <Route path='/support' element={<SupportScreen />} />
          <Route path='*' element={<Home />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/adminlogin' element={<LoginScreen />} />
          <Route path='/adminsignup' element={<SignupScreen />} />
          <Route path='/resetpassword' element={<ResetPasswordScreen />} />
          <Route path='/upgrade' element={!admin?<LoginScreen />:<UpgradeScreen />} />
          <Route path='/forgetsecretkey' element={!admin?<LoginScreen />:<UserForgetSecretKeyScreen />} />
          <Route path='/updatesecretkey/:id' element={!admin?<LoginScreen />:<UserUpdateSecretKeyScreen />} />
          <Route path='/upgrade/:id' element={!admin?<LoginScreen />:<UpgradeFormScreen />} />
          <Route path='/fund' element={!admin?<LoginScreen />:<FundScreen />} />
          <Route path='/fund/:id' element={!admin?<LoginScreen />:<FundFormScreen />} />
          <Route path='/admin' element={!admin?<LoginScreen />:<AdminScreen />} />
          <Route path='/admin/:id' element={!admin?<LoginScreen />:<AdminFormScreen />} />




          {/* User Routes*/}
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/signin' element={<EmailLogin />} />\
          <Route path='/signin/:id' element={<PasswordLogin />} />
          <Route path='/verification/:id' element={<EmailVerify />} />
          <Route path='/notificationoption/:id' element={<OptionNotification />} />
          <Route path='/verifyemail/:id' element={<EmailVerificationResult />} />
          <Route path='/phonesignup/:id' element={<PhoneSignup />} />
          <Route path='/verifyphone/:id/:phoneId' element={<PhoneVerification />} />
          <Route path='/addcredentials/:id' element={<Card />} />
          <Route path='/add-card/:id' element={<AddCard />} />
          <Route path='/forgetPassword' element={<UserForgetPasswordScreen />} />
          <Route path='/resetpassword/:id' element={<ResetPassordScreen />} />
          <Route path='/learn' element={<LearnScreen />} />


          {/* the user dashbaord  section*/}
          <Route path='/home' element={!user?<EmailLogin />:<DashboardHome />} />
          <Route path='/assets' element={!user?<EmailLogin />:<DashboardAsset />} />
          <Route path='/trade' element={!user?<EmailLogin />:<DashboardTrade />} />
          <Route path='/pay' element={!user?<EmailLogin />:<DashboardPay />} />
          <Route path='/coin/:name/:market_cap/:market_cap_rank/:percentage/:total_volume/:price' element={!user?<EmailLogin />:<DashboardChart />} />
          <Route path='/assets/:action' element={!user?<EmailLogin />:<AssetList />} />
          <Route path='/exchange/:fromcoin/:fromcoinsymbol/:fromcoinprice' element={!user?<EmailLogin />:<ExchangeList />} />

          <Route path='/recieve' element={!user?<EmailLogin />:<Recieve />} />
          <Route path='/send' element={!user?<EmailLogin />:<SendCrypto />} />
          <Route path='/calculate/:action/:id/:symbol/:price/:medium' element={!user?<EmailLogin />:<CryptoCalculator />} />

          <Route path='/calculateexchange/:fromcoin/:fromcoinsymbol/:fromcoinprice/:tocoin/:tocoinsymbol/:tocoinprice' element={!user?<EmailLogin />:<ExchangeCalculator />} />

          <Route path='/recipient/bankcredential/:asset/:amount/:price' element={!user?<EmailLogin />:<BankForm />} />
          <Route path='/recipient/walletaddress/:asset/:amount/:price' element={!user?<EmailLogin />:<WalletForm />} />
          <Route path='/walletaddress' element={!user?<EmailLogin />:<AssetAddress />} />
          <Route path='/earn' element={!user?<EmailLogin />:<Earn />} />
          <Route path='/notifications' element={!user?<EmailLogin />:<Notification />} />
          <Route path='/invite' element={!user?<EmailLogin />:<Invite />} />
          <Route path='/secondverification' element={!user?<EmailLogin />:<AssetAddress />} />
          <Route path='/paymentinformation' element={<AddCard />} />
          <Route path='/profilesettings' element={!user?<EmailLogin />:<ProfileSetting />} />
          <Route path='/limits' element={!user?<EmailLogin />:<Limits />} />
          <Route path='/updateinformation' element={!user?<EmailLogin />:<UpdateUserInfo />} />
          <Route path='/privacy' element={!user?<EmailLogin />:<Privacy />} />
          <Route path='/theme' element={!user?<EmailLogin />:<Appearance />} />
          <Route path='/changephone' element={!user?<EmailLogin />:<ChangePhone />} />
          <Route path='/newphone' element={!user?<EmailLogin />:<NewPhone />} />
          <Route path='/confirmnewphone' element={!user?<EmailLogin />:<ConfirmNewPhone />} />
          <Route path='/tax' element={!user?<EmailLogin />:<TaxCode />} />
          <Route path='/tnt' element={!user?<EmailLogin />:<Tntcode />} />
          <Route path='/ust' element={!user?<EmailLogin />:<Ustcode />} />
          <Route path='/ktc' element={!user?<EmailLogin />:<Ktccode />} />
          <Route path='/idverification' element={!user?<EmailLogin />:<Idverification />} />
          <Route path='/frontidentification' element={!user?<EmailLogin />:<FrontID />} />
          <Route path='/backidentification' element={!user?<EmailLogin />:<BackID />} />
          <Route path='/setpin' element={!user?<EmailLogin />:<ChangePin />} />
          <Route path='/transactions' element={!user?<EmailLogin />:<Transactions />} />
          <Route path='/top-up' element={!user?<EmailLogin />:<TopUpForm />} />

          {/*crypto-basics*/}
          <Route path='/learn/crypto-basics/' element={<CryptoBasics />} />
          <Route path='/learn/crypto-basics/what-is-dogecoin' element={<Dogecoin />} />
          <Route path='/learn/crypto-basics/what-is-bitcoin' element={<Bitcoin />} />
          <Route path='/learn/crypto-basics/what-is-blockchain' element={<Blockchain />} />
          <Route path='/learn/crypto-basics/what-is-ethereum' element={<Ethereum />} />
          <Route path='/learn/crypto-basics/what-is-cryptocurrency' element={<CryptoCurrency />} />
          <Route path='/learn/crypto-basics/what-is-volatility' element={<Volatility />} />
          <Route path='/learn/crypto-basics/what-is-token' element={<Token />} />
          <Route path='/learn/crypto-basics/what-is-stablecoin' element={<Stablecoin />} />
          <Route path='/learn/crypto-basics/what-is-inflation' element={<Inflation />} />
          <Route path='/learn/crypto-basics/what-is-cefi' element={<Cefi />} />
          {/*tips and tutorial*/}
          <Route path='/learn/tips-and-tutorials' element={<Tips />} />
          <Route path='/learn/tips-and-tutorials/how-to-send-crypto' element={<Send />} />

        </Routes>

      </Suspense>
    </div>

  );
}

export default App;
