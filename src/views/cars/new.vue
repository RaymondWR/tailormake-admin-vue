<template>
  <div>
    <p>Enter Details of the new Car in the form below</p>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Make" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="car.make"
          type="text"
          placeholder="Enter car make here please"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-form-group id="input-group-2" label="Model:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="car.model"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Year:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="car.year"
          placeholder="Enter Year"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Fuel Type:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="car.fuelType"
          :options="fuelTypeOptions"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Engine Size:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="car.engineSize"
          placeholder="Enter Size of Engine"
          type='number'
          step="0.01"
          min="0"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Color:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="car.color"
          placeholder="Enter Color of Car"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Transmission:" label-for="input-7">
        <b-form-select
          id="input-7"
          v-model="car.transmission"
          placeholder="Transimission of Car"
          :options="transmissionOptions"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-8" label="Body Type:" label-for="input-8">
        <b-form-select
          id="input-8"
          v-model="car.bodyType"
          placeholder="Transimission of Car"
          :options="bodyTypeOptions"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-9" label="Mileage:" label-for="input-9">
        <b-form-input
          id="input-9"
          v-model="car.mileage"
          placeholder="Mileage"
          type='number'
          step="1"
          min="0"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-10" label-for="input-10">
        <b-form-input
          id="input-10"
          v-model="car.seats"
          placeholder="number of seats"
          type='number'
          step="1"
          min="0"
          required
        ></b-form-input>
        <b-form-input
          id="input-11"
          v-model="car.doors"
          placeholder="number of doors"
          type='number'
          step="1"
          min="0"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-11" label="Car History" label-for="input-11">
        <b-form-select
          id="input-11"
          v-model="car.registrationCountry"
          placeholder="Registed Country"
          :options="registrationCountryOptions"
          required
        ></b-form-select>
        <b-form-input
          id='input-12'
          v-model='car.roadTax'
          placeholder="how much is the raod tax"
          type='number'
          step="0.1"
          min="0"
        >
        </b-form-input>
        <b-form-input
          id='input-12'
          v-model='car.previousOwner'
          placeholder="Number of previous owner"
          type='number'
          step="1"
          min="0"
        >
        </b-form-input>
      </b-form-group>

    <b-form-group id='input-group-11' label='Engine Details' label-for='input-12'>
      <b-form-input
        id='input-12'
        v-model='car.emission'
        placeholder="size of emssion"
        type='number'
        step="0.01"
        min="0"
      >
      </b-form-input>
      <b-form-input
        id='input-12'
        v-model='car.enginePower'
        placeholder="Engine Power"
        type='number'
        step="0.1"
        min="0"
      >
      </b-form-input>
    </b-form-group>

      <b-form-group id="input-group-5" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="checked"
          id="checkboxes-5"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">I aggre with the contract with XXX-Autos</b-form-checkbox>
          <b-form-checkbox value="that">Confirm the details</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>

</template>

<script>
import carApi from '../../../apis/cars';

export default {
    data () {
        return {
          car: {
            make: '',
            model: '',
            year: null,
            fuelType: null,
            engineSize: null,
            color: '',
            transmission: null,
            bodyType: '',
            mileage: null,
            doors: null,
            seats: null,
            registrationCountry: null,
            emission: null,
            enginePower: null,
            roadTax: null,
            previousOwner: null
          },
          fuelTypeOptions : [{ text: 'Select One', value: null }, 'Petrol', 'Deisel', 'Hybrid', 'Electric'],
          transmissionOptions: [{ text: 'Select One', value: null }, 'Manual', 'Automatic', 'CVT', 'Electric'],
          registrationCountryOptions: [{ text: 'Select One', value: null }, 'Ireland', 'UK', 'Other'],
          bodyTypeOptions: [{ text: 'Select One', value: null }, 'Hatchback', 'Saloon', 'SUV', 'Coupe'],
          foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
          checked: [],
          show: true
        }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        carApi.postNewCar(this.car)
        .then(function (response) {
          console.log(response);
          this.onReset();
        })
        .catch(error => {
          console.log(error)
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.car.make= ''
        this.car.model= ''
        this.car.year= null
        this.car.fuelType= null
        this.car.engineSize= null
        this.car.color= ''
        this.car.transmission= null
        this.car.bodyType= ''
        this.car.mileage= null
        this.car.doors= null
        this.car.seats= null
        this.car.registrationCountry= null
        this.car.emission= null
        this.car.enginePower= null
        this.car.roadTax= null
        this.car.previousOwner= null
        this.car.checked= []

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
}
</script>
