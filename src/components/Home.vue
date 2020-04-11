<template>
  <div>
    <section>
      <form class="md-layout" @submit.prevent>
        <md-card class="md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">Welcome,</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-datepicker v-model="todayDate">
                  <label>Select date</label>
                </md-datepicker>
              </div>

              <!-- div batch -->
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="batchType">Select Batch</label>
                  <md-select
                    md-dense
                    vif="batches.length"
                    name="batchType"
                    v-model="myOptionSelected"
                    id="batchType"
                  >
                    <md-option
                      v-for="batch in batches"
                      :key="batch.id"
                      :value="batch.id"
                    >{{ batch.name }}</md-option>
                  </md-select>
                </md-field>
              </div>
              <!-- div batch -->

              <!-- div students -->
              <div v-if="students" class="md-layout-item md-small-size-100">
                <md-list>
                  <md-list-item class="md-elevation-1 md-primary">
                    <md-avatar></md-avatar>
                    <span class="md-list-item-text">Student</span>
                    <span>Absent</span>
                  </md-list-item>

                  <div v-for="student in students" v-bind:key="student['.key']">
                    <md-list-item class="md-elevation-1">
                      <md-avatar>
                        <md-icon>assignment_ind</md-icon>
                      </md-avatar>
                      <span class="md-list-item-text">{{ student.name }}</span>
                      <md-switch v-model="absent" :value="student.studentid" :id="student.name"></md-switch>
                      <!-- <md-checkbox v-model="absent" :value="student.studentid" :id="student.name"></md-checkbox> -->
                    </md-list-item>
                    <md-divider></md-divider>
                  </div>
                </md-list>
                <md-button class="md-raised md-primary" @click="markAttendance">Save</md-button>
                <md-button class="md-raised md-accent">Cancel</md-button>
              </div>
              <!-- div students -->
            </div>
          </md-card-content>
        </md-card>
      </form>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.md-checkbox {
  display: flex;
}
</style>
<script>
import { mapState } from "vuex";

const fb = require("../firebaseConfig.ts");

export default {
  data() {
    let dateFormat = this.$material.locale.dateFormat || "yyyy-MM-dd";
    let now = new Date();
    return {
      todayDate: now,
      myOptionSelected: "",
      batches: null,
      students: null,
      present: true,
      absent: [],
      selectedBatch: null
    };
  },

  watch: {
    myOptionSelected: function(batchId) {
      this.getStudents(batchId);
      this.selectedBatch = batchId;
    }
  },

  computed: {
    ...mapState(["userProfile", "currentUser"])
  },
  methods: {
    getStudents: function(event) {
      this.absent = [];
      let studentArray = [];
      var studentRef = fb.studentCollection;
      studentRef
        .orderByChild("batchid")
        .equalTo(event)
        .on("child_added", function(snapshot) {
          // console.log(snapshot.key + " was " + snapshot.val().name + " m tall");
          studentArray.push(snapshot.val());
        });
      this.students = studentArray;
    },

    markAttendance: function(event) {
      var absentListRef = fb.absentCollection;
      for (let absentStudentId of this.absent) {
        var absentRef = absentListRef.push();
        console.log("Saving to firebase - " + absentStudentId); // 1, "string", false
        absentRef.set({
          absentstudent: absentStudentId,
          batchid: this.selectedBatch,
          date: this.todayDate.toDateString()
        });
      }
    }
  },

  mounted() {
    let batchArray = [];
    var batchesRef = fb.batchCollection;
    batchesRef.orderByChild("name").on("child_added", function(snapshot) {
      // console.log(snapshot.key + " was " + snapshot.val().name + " m tall");
      batchArray.push(snapshot.val());
    });
    this.batches = batchArray;
  },

  filters: {
    formatDate(val) {},
    trimLength(val) {}
  }
};
</script>