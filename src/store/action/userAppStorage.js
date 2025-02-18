export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOG_ADMIN_IN = 'LOG_ADMIN_IN'
export const LOG_USER_IN = 'LOG_USER_IN'
export const LOGIN_USER = "LOGIN_USER";
export const MODIFY_WATCHLIST = 'MODIFY_WATCHLIST'
export const ADD_ID = 'ADD_ID'
export const LOGOUT = 'LOGOUT'
export const LOAD_COINS = 'LOAD_COINS'
export const GET_THEME = 'GET_THEME'

/* Admin actions*/

//pure functions to calculate the time remaining

let calculateRemainingTime = (expiryDate) => {
  //getting current time in milliseconds
  const currentTime = new Date().getMilliseconds()
  //getting expiration time in milliseconds
  const adjustExpirationTime = (expiryDate * 60 * 60 * 1000)
  const timeLeft = adjustExpirationTime - currentTime

  return timeLeft
}

let retrievedAdminStoredToken = () => {
  let tokenFromStorage = localStorage.getItem('admin_token')
  let expiryDate = localStorage.getItem('admin_expiry')
  const timeLeft = calculateRemainingTime(expiryDate)

  if (timeLeft <= 3600) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_expiry')
    localStorage.removeItem('admin')

    return {
      adminToken: "",
      adminExpiresIn: ""
    }
  }

  return {
    adminToken: tokenFromStorage,
    adminExpiresIn: timeLeft
  }
}

export const checkIfAdminIsLoggedIn = () => {
  return async (dispatch, getState) => {
    try {
      let response
      //check if token is expired
      let { adminToken, adminExpiresIn } = retrievedAdminStoredToken()

      if (!adminToken) {
        return
      }
      //convert expiresIN backt to hours
      adminExpiresIn = adminExpiresIn / (60 * 60 * 1000)

      localStorage.setItem('admin_token', adminToken)
      localStorage.setItem('admin_expiry', adminExpiresIn)

      let admin = JSON.parse(localStorage.getItem('admin'))

      if (!admin) {
        return
      }

      response = await fetch(`https://capchain-backend.onrender.com/auth/adminbytoken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      if (response.status == 200) {
        let data = await response.json()
        data.response.adminToken = adminToken
        dispatch({ type: LOG_ADMIN_IN, payload: data.response })
      }

    } catch (err) {

    }
  }
}

export const adminsignup = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/adminsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()

        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}

export const adminlogin = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/adminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()


        //saving data to local storage
        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("admin_token", JSON.stringify(data.response.adminToken))

        localStorage.setItem("admin_expiry", JSON.stringify(data.response.adminExpiresIn))


        dispatch({ type: LOGIN_ADMIN, payload: data.response })

        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {

      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const loadClients = () => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/users`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const loadClient = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

//admin operating onn admins
export const loadAdmins = () => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth

    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/admins`, {

        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })

      if (response.status === 404) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }

      }


      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}

export const deleteAdmin = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth

    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/deleteadmin/${id}`, {

        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const loadAdmin = (id) => {

  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth

    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/admin/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const updateClient = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/updateuser`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}
export const updateAdmin = (data) => {

  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/updateadmin`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const upgradeClient = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/upgradeuser`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const emailClient = (data) => {

  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/emailuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const deleteClient = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { adminToken } = getState().userAuth

    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/deleteclient/${id}`, {

        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}








/* xxxxxxxxxx   User actions xxxxxxxxxx */
export const confirm = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/verifyemail/${data}`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

//checking if email exist
export const isEmailExist = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/isemailexist`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 500) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}

export const checkAdminCode = (code) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/checkadmincode/${code}`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "please check your network"
      }
    }
  }

}

export const emailAdmin = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/emailadmin`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}

export const changeSecretKey = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/changesecretkey`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}

export const resetPassword = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/resetpassword/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

/* utility function  loading coins */






// xxxxxxxx   web client api xxxxxxxx
let retrievedUserStoredToken = () => {
  let tokenFromStorage = localStorage.getItem('user_token')

  let expiryDate = localStorage.getItem('user_expiry')

  const timeLeft = calculateRemainingTime(expiryDate)

  if (timeLeft <= 3600) {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_expiry')
    localStorage.removeItem('user')

    return {
      userToken: "",
      userExpiresIn: ""

    }
  }

  return {
    userToken: tokenFromStorage,
    userExpiresIn: timeLeft
  }
}

export const checkIfUserIsLoggedIn = () => {
  return async (dispatch, getState) => {
    try {
      let response
      //check if token is expired
      let { userToken, userExpiresIn } = retrievedUserStoredToken()

      if (!userToken) {
        return
      }
      //convert expiresIN backt to hours
      userExpiresIn = userExpiresIn / (60 * 60 * 1000)

      localStorage.setItem('user_token', userToken)
      localStorage.setItem('user_expiry', userExpiresIn)

      let user = JSON.parse(localStorage.getItem('user'))

      if (!user) {
        return
      }

      response = await fetch(`https://capchain-backend.onrender.com/auth/userbytoken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        }
      })

      if (response.status == 200) {
        let data = await response.json()
        data.response.userToken = userToken
        dispatch({ type: LOG_USER_IN, payload: data.response })
      }

    } catch (err) {

    }
  }
}


export const checkEmail = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://capchain-backend.onrender.com/auth/checkemail/${data}`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}

//login handler for user on web
export const loginUser = (dataObj) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://capchain-backend.onrender.com/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj)
      })
      if (response.status === 404) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'signup'
        }
      }
      if (response.status === 403) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: `signin/${dataObj.email}`
        }
      }
      if (response.status === 300) {

        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: `signin/${dataObj.email}`
        }
      }
      if (response.status === 500) {

        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: `signin/${dataObj.email}`
        }
      }
      if (response.status === 201) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: `verification/${dataObj.email}`
        }
      }
      if (response.status === 202) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: `phonesignup/${dataObj.email}`
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        //saving data to local storage
        localStorage.setItem("user", JSON.stringify(data.response.user))

        localStorage.setItem("user_token", JSON.stringify(data.response.token))

        localStorage.setItem("user_expiry", JSON.stringify(data.response.expiresIn))

        dispatch({ type: LOGIN_USER, payload: data.response })


        return {
          bool: true,
          message: data.response,
        }

      }
    } catch (err) {
      return {
        bool: false,
        message: err.message,
        url: 'Login'

      }
    }

  }
}
//signup handler for user on web
export const signupUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://capchain-backend.onrender.com/auth/emailsignup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/signup'
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/signin'
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }

    }
    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

//checking if user has verified their email
export const verifiedEmail = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://capchain-backend.onrender.com/auth/confirmuserverification', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

//cancel registeration by user during auth
export const cancelRegisteration = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://capchain-backend.onrender.com/auth/cancelregisteration', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

//phone signup for web client
export const phoneSignup = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://capchain-backend.onrender.com/auth/phone', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


export const phoneVerification = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://capchain-backend.onrender.com/auth/confirmphone', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        //saving data to local storage
        localStorage.setItem("user", JSON.stringify(data.response.user))

        localStorage.setItem("user_token", JSON.stringify(data.response.token))

        localStorage.setItem("user_expiry", JSON.stringify(data.response.expiresIn))


        dispatch({ type: LOGIN_USER, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


export const addPaymentMethod = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { userToken } = getState().userAuth
    try {

      let response = await fetch(`https://capchain-backend.onrender.com/auth/paymentmethod`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}


export const loadCoins = (pageNumber, no) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let response = await fetch(`https://capchain-backend.onrender.com/coins/${no}/${pageNumber}`)

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: LOAD_COINS, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

      return {
        bool: true,
        message: response.data
      }



    } catch (err) {
      return {
        bool: false,
        message: err
      }

    }

  }
}

export const getDetailedCoinData = (coinId) => {

  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let response = await fetch(`https://capchain-backend.onrender.com/coin/${coinId}`)

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

      return {
        bool: true,
        message: response.data
      }



    } catch (err) {
      return {
        bool: false,
        message: err
      }

    }

  }
}

export const getCoinMarketChart = (coinId, selectedRange) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let response = await fetch(`https://capchain-backend.onrender.com/coinmarketchart/${coinId}/${selectedRange}`)

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()


        return {
          bool: true,
          message: data.response
        }
      }

      return {
        bool: true,
        message: response.data
      }

    } catch (err) {
      return {
        bool: false,
        message: err
      }

    }
  }
}

export const getCoin = (coinId) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let response = await fetch(`https://capchain-backend.onrender.com/singlecoin/${coinId}`)

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()


        return {
          bool: true,
          message: data.response
        }
      }

      return {
        bool: true,
        message: response.data
      }

    } catch (err) {
      return {
        bool: false,
        message: err
      }

    }
  }
}

export const addToWatchList = (data) => {
  return async (dispatch, getState) => {

    //do some check on the server if its actually login before proceding to dispatch
    let { userToken } = getState().userAuth

    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/modifywatchlist`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: MODIFY_WATCHLIST, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const loadWatchList = (ids) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let response = await fetch(`https://capchain-backend.onrender.com/coinlist/${ids}`)

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const uploadFrontId = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/addfrontid`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }


}

export const uploadBackId = (data) => {
  return async (dispatch, getState) => {
    try {


      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/addbackid`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user

        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }

    }


  }


}

export const changeWalletAsset = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { userToken } = getState().userAuth

    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/changewalletaddress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //dispatch the credentials to redux store to update user
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const getNotifications = () => {
  return async (dispatch, getState) => {
    let { userToken } = getState().userAuth

    try {

      let response = await fetch(`https://capchain-backend.onrender.com/auth/notifications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()
        dispatch({ type: ADD_ID, payload: data.response.user })


        return {
          bool: true,
          message: data.response
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const updateCredentials = (data) => {
  return async (dispatch, getState) => {
    let { userToken } = getState().userAuth

    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/credentials`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: 'could not update information'
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: 'could not update information'
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: 'could not update information'
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ADD_ID, payload: data.response })
        return {
          bool: true,
          message: 'successfully updated your information'
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const closeMyAccount = () => {
  return async (dispatch, getState) => {
    let { userToken } = getState().userAuth
    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/closemyaccount`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        }
      })

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const secureAccount = (data) => {
  return async (dispatch, getState) => {
    let { userToken } = getState().userAuth

    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/secureaccount`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify({ pin: data })
      })

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const offPinSwitch = () => {
  return async (dispatch, getState) => {
    let { userToken } = getState().userAuth

    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/offpinswitch`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const onPinSwitch = () => {
  return async (dispatch, getState) => {
    let { userToken } = getState().userAuth

    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/onpinswitch`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
        }


      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const logout = () => {
  return async (dispatch, getState) => {

    localStorage.getItem('user_token')
    localStorage.removeItem('user_expiry')

    dispatch({ type: LOGOUT, payload: null })

  }

}

//fetching all transactions

export const getTransactions = () => {
  return async (dispatch, getState) => {
    let { userToken } = getState().userAuth
    try {
      let response = await fetch(`https://capchain-backend.onrender.com/auth/transactions`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }

}

export const sellCrypto = (data) => {
  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/sellasset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        dispatch({ type: ADD_ID, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const buyCrypto = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch

      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/buyasset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        dispatch({ type: ADD_ID, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const convertCrypto = (data) => {

  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/convertasset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        dispatch({ type: ADD_ID, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const sendCryptoToBank = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/sendassettobank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'tax'
        }
      }
      if (response.status === 401) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'tnt'
        }
      }
      if (response.status === 402) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'ust'
        }
      }
      if (response.status === 403) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'ktc'
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 200) {

        let data = await response.json()
        //update user in store
        dispatch({ type: ADD_ID, payload: data.response })

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const sendCryptoToWallet = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/sendassettowallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'tax'
        }
      }
      if (response.status === 401) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'tnt'
        }
      }
      if (response.status === 402) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'ust'
        }
      }
      if (response.status === 403) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: 'ktc'
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //update user in store
        dispatch({ type: ADD_ID, payload: data.response })
        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}


export const sendTaxCode = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/updatetaxcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}

export const sendUstCode = (data) => {
  return async (dispatch, getState) => {
    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/updateustcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const sendKtcCode = (data) => {

  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/updatektccode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}
export const sendTntCode = (data) => {

  return async (dispatch, getState) => {

    try {
      //do some check on the server if its actually login before proceding to dispatch
      let { userToken } = getState().userAuth

      let response = await fetch(`https://capchain-backend.onrender.com/auth/updatetntcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`

        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        console.log(data.response)
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          message: data.response
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: 'network error'
      }
    }

  }
}


export const getTheme = () => {
  return async (dispatch, getState) => {

    let theme = localStorage.getItem('THEME')
    if (!theme) {
      let color = {
        background: 'black',
        importantText: 'white',
        normalText: '#5d616d',
        fadeColor: 'rgb(30,30,30)',
        blue: '#1652f0',
        fadeButtonColor: 'rgb(30,30,30)',
      }
      dispatch({ type: GET_THEME, payload: color })
      return

    } else if (theme === 'dark') {
      let color = {
        background: 'black',
        importantText: 'white',
        normalText: '#5d616d',
        fadeColor: 'rgb(30,30,30)',
        blue: '#1652f0',
        fadeButtonColor: 'rgb(30,30,30)',
      }

      dispatch({ type: GET_THEME, payload: color })
      return



    }else if (theme === 'light') {
      let color = {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
      }
      
      dispatch({ type: GET_THEME, payload: color })
      return



    }

  }

}

export const changeTheme = (bool) => {
  return async (dispatch, getState) => {

    if (bool) {
      localStorage.setItem('THEME','light')

      let color = {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
      }

     
      
      dispatch({ type: GET_THEME, payload: color })
      return

    } else{
      localStorage.setItem('THEME','dark')

      let color = {
        background: 'black',
        importantText: 'white',
        normalText: '#5d616d',
        fadeColor: 'rgb(30,30,30)',
        blue: '#1652f0',
        fadeButtonColor: 'rgb(30,30,30)',
      }
      dispatch({ type: GET_THEME, payload: color })
      return
    }

  }

}











