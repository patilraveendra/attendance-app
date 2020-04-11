<template>
  <div id="login">
    <transition name="fade"></transition>
    <section class="md-accent">
      <div class="col1">
        <h1>Attendance Management</h1>
      </div>
      <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
        <form class="md-layout" v-if="showLoginForm" @submit.prevent>
          <md-card   class=" md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
              <div class="md-title">Welcome</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="email1">Email</label>
                    <md-input
                      name="email1"
                      id="email1"
                      autocomplete="given-name"
                      v-model.trim="loginForm.email"
                      :disabled="performingRequest"
                    />
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="password1">Password</label>
                    <md-input
                      name="password1"
                      id="password1"
                      type="password"
                      autocomplete="given-name"
                      v-model.trim="loginForm.password"
                      :disabled="performingRequest"
                    />
                  </md-field>
                </div>
              </div>
              <div v-if="performingRequest">
                <md-progress-bar class="md-accent" md-mode="indeterminate"></md-progress-bar>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button
                type="submit"
                @click="login"
                class="md-primary md-raised"
                :disabled="performingRequest"
              >Login</md-button>
              <md-button
                type="submit"
                @click="togglePasswordReset"
                class="md-primary"
                :disabled="performingRequest"
              >Reset Password</md-button>
            </md-card-actions>
          </md-card>
        </form>

        <form v-if="showForgotPassword" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>

            <label for="email3">Email</label>
            <input
              v-model.trim="passwordForm.email"
              type="text"
              placeholder="you@email.com"
              id="email3"
            />

            <button @click="resetPassword" class="button">Submit</button>

            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>check your email for a link to reset your password</p>
            <button @click="togglePasswordReset" class="button">Back to login</button>
          </div>
        </form>
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>
<style>
.md-progress-spinner {
  margin: 24px;
}
</style>
<script>
const fb = require("../firebaseConfig");
export default {
  name:"Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },

      passwordForm: {
        email: ""
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ""
    };
  },
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },
    login() {
      this.performingRequest = true;
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.performingRequest = false;
          this.$router.push("/home");
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    resetPassword() {
      this.performingRequest = true;
      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordResetSuccess = true;
          this.passwordForm.email = "";
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
  }
};
</script>