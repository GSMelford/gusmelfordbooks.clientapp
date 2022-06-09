<template>
  <div>
    <div>
      <div>
        <div class="login-form">
          <h2 v-if="!settings.registerActive">GusMelford <i>Books</i></h2>
          <div v-if="!settings.registerActive">
            <form>
              <h3>Sign In</h3>
              <input v-model="userInfo.email" type="email" placeholder="Email" required>
              <input v-model="userInfo.password" type="password" placeholder="Password" required>
              <site-button text="Login" width="100%" @click="doLogin"></site-button>
              <p>Don't have an account? <a href="#" @click="settings.registerActive = !settings.registerActive; formHeight = '640px'">Sign up here</a></p>
            </form>
          </div>

          <div v-else>
            <form>
              <h3>Sign Up</h3>
              <input v-model="userInfo.email" type="email" placeholder="Email" required>
              <input v-model="userInfo.firstName" type="text" placeholder="First Name" required>
              <input v-model="userInfo.middleName" type="text" placeholder="Middle Name">
              <input v-model="userInfo.lastName" type="text" placeholder="Last Name" required>
              <input v-model="userInfo.phone" type="text" placeholder="Phone" required>
              <input v-model="userInfo.password" type="password" placeholder="Password" required>
              <input v-model="userInfo.confirmPassword" type="password" placeholder="Confirm Password" required>
              <site-button text="Register" width="100%" @click="doRegister"></site-button>
              <p>Already have an account? <a href="#" @click="settings.registerActive = !settings.registerActive; formHeight = '380px'">Sign in here</a></p>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SiteButton from '@/components/siteTemplates/siteButton.vue'

export default defineComponent({
  name: 'LoginView',
  components: { SiteButton },
  data: () => {
    return {
      userInfo: {
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      settings: {
        registerActive: false
      },
      formHeight: '380px'
    }
  },

  methods: {
    doLogin: async function () {
      if (this.userInfo.email === '') {
        alert('You have not entered an email')
      } else if (this.userInfo.password === '') {
        alert('You have not entered an password')
      } else {
        const status = await (this.$store.dispatch('onLogin', {
          email: this.userInfo.email,
          password: this.userInfo.password
        }))
        if (status) {
          await this.$router.push({ name: 'home' })
        } else {
          alert('Invalid password')
        }
      }
    },
    doRegister: async function () {
      if (this.userInfo.password !== this.userInfo.confirmPassword) {
        alert('Passwords do not match')
      } else {
        const status = await (this.$store.dispatch('register', {
          email: this.userInfo.email,
          password: this.userInfo.confirmPassword,
          firstName: this.userInfo.firstName,
          middleName: this.userInfo.middleName,
          lastName: this.userInfo.lastName,
          phone: this.userInfo.phone
        }))
        if (status) {
          alert('Ok')
          await this.$router.push({ name: 'home' })
        } else {
          alert('Something went wrong, try again')
        }
      }
    }
  }
})
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

form {
  height: v-bind(formHeight);
  width: 400px;
  font-family: 'Open Sans', sans-serif;
  color: snow;
  background-color: #232323;
  border-radius: 10px;
  box-shadow: #c38fff 0 1px 4px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 50px 35px;
}

form * {
  font-family: 'Open Sans', sans-serif;
  color: snow;
  letter-spacing: 1px;
  outline: none;
  border: none;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

h2 {
  font-size: 64px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  color: snow;
  padding: 15px;
  width: 400px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  backdrop-filter: blur(10px);
}

input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: #e3d0e8;
  border-radius: 5px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: large;
  font-weight: bold;
  color: black;
}

::placeholder {
  color: #777777;
}

p{
  margin-top: 10px;
}
</style>
