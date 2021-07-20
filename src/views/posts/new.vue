<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <div class="mb-5 border">
        <b-form-group
          id="input-group-1"
          label="Title & Description"
          label-for="input-1"
          description="* Car detail would help customers understand your car conditions."
        >
          <b-form-input
            id="input-1"
            v-model="title"
            placeholder="Enter Title here"
            required
          ></b-form-input>
          <b-form-textarea
            id="input-1"
            v-model="description"
            placeholder="Enter Description here"
            rows="4"
            max-rows="5"
            required
          ></b-form-textarea>
        </b-form-group>
      </div>

      <div class="mt-5 border">
        <p class="text-center">Select your Car & Upload Photos</p>
        <b-row>
          <b-col sm=12 md=6 lg=6>
            <b-form-group id="input-group-3" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="carId"
                :options="availableCarOptions"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col sm=12 md=6 lg=6>
            <b-form-file
              v-model="files"
              :state="Boolean(files)"
              accept="image/jpeg, image/png"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              multiple
            ></b-form-file>
          </b-col>
        </b-row>
      </div>

      <div class="mt-5 mb-3 border">
        <p class="text-center">Select Valid Period for the Post</p>
        <b-row>
          <b-col>
            <label for="start-datepicker">Choose the start date of your post</label>
            <b-form-datepicker required id="start-datepicker" v-model="startDate" class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <label for="start-datepicker" >Choose the start time of your post</label>
            <b-form-timepicker v-model="startTime" locale="en"></b-form-timepicker>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <label for="end-datepicker">Choose the End Date of your Post</label>
            <b-form-datepicker id="end-datepicker" v-model="endDate" class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <label for="end-datepicker">Choose the End Time of your Post</label>
            <b-form-timepicker v-model="endTime" locale="en"></b-form-timepicker>
          </b-col>
        </b-row>
      </div>

      <div class="my-2 text-center">
        <b-row>
          <b-col>
            <b-form-checkbox size=md v-model="isPopular" class="mb-2 mr-sm-2 mb-sm-0">Keep my Post Popular</b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-checkbox size=md v-model="isHighlighted" class="mb-2 mr-sm-2 mb-sm-0">Highlight my Post</b-form-checkbox>
          </b-col>
        </b-row>
      </div>

      <div class="my-2 text-center">
        <b-button class="mx-2" type="submit" variant="primary">Submit</b-button>
        <b-button class="mx-2" type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      carId: null,
      title: null,
      description: null,
      isPopular: false,
      isHighlighted: false,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      availableCarOptions: [{ text: 'Select One Car', value: null }],
      files: []
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if (this.startDate == null || this.endDate == null) {
        alert("please Select date pickers for Both Start Date and End Date");
        return;
      }

      const postForm = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]
        postForm.append('files', file)
      }

      const temStartTime = this.startTime ? this.startTime : "00:00:00";
      const temEndTime = this.endTime ? this.endTime : "00:00:00";

      const postStartTime =  this.startDate + " " +  temStartTime;
      const postEndTime =  this.endDate + " " +  temEndTime;

      postForm.append('carId', this.carId)
      postForm.append('startTime', postStartTime)
      postForm.append('endTime', postEndTime)
      postForm.append('title', this.title)
      postForm.append('description', this.description)
      postForm.append('isPopular', this.isPopular)
      postForm.append('isHighlighted', this.isHighlighted)

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      axios.post("http://127.0.0.1:8000/saleposts/new", postForm, config)
      .then((res) => {
        console.log("post request success >>>", res)
        this.onReset(null)
      })
      .catch((error) => console.log(error))
    },

    onReset(event) {
      if (event) event.preventDefault();
      this.carId = null;
      this.title = null;
      this.description = null;
      this.isPopular = false;
      this.isHighlighted = false;
      this.startDate =  null;
      this.endDate = null;
      this.startTime = null;
      this.endTime = null;
      this.files = [];
    }
  },

  mounted() {
    axios.get("http://127.0.0.1:8000/cars/list")
    .then((res) => {
      if(res && [200, 201].includes(res.status)) {
        const carlist = res.data
        if (carlist.length > 0 ) {
          const availableCars = carlist.map(x=> {
            return {
              text: x.make + " " + x.model + " (" + x.year + ")",
              value: x.id
            }
          })
          this.availableCarOptions.push(...availableCars)
        } else {
          alert("No Car you can select, please add a Car first")
        }
      } else {
        console.log("request success but return wrong info ", res)
      }
    })
    .catch((error) => console.log("error>>> ", error))
  }
}
</script>


<style>
#input-group-1 small {
  text-align: left;
}

#input-group-1 label {
  text-align: center;
}
</style>
