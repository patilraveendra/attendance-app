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
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="batchType">Select Batch</label>
                  <md-select
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
            </div>

            <div v-if="students">
              <md-list>
                <md-list-item>
                  <md-avatar></md-avatar>
                  <span class="md-list-item-text">Name of student</span>
                  <span>Absent</span>
                </md-list-item>
                <md-list-item v-for="student in students" v-bind:key="student['.key']">
                  <md-avatar>
                    <md-icon>assignment_ind</md-icon>
                  </md-avatar>
                  <span class="md-list-item-text">
                    {{ student.name }}
                    <!-- <input type="checkbox" :value="student.studentid" :id="student.studentid" v-model="absent" @click="check($event)"> -->
                  </span>
                  <md-checkbox v-model="absent" :value="student.studentid" :id="student.name"></md-checkbox>
                </md-list-item>
              </md-list>
              <md-button class="md-raised md-primary" @click="markAttendance">Save</md-button>
              <md-button class="md-raised md-accent">Cancel</md-button>
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
      console.log(event);
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