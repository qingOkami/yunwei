<template>
  <div>


  <select v-model="selected" style="width: 200px;height: 200px;" >
    <option v-for="option in options" :value="option.TeacherName">
      {{ option.text }}
    </option>
  </select>
  <input style="width: 100px;height: 50px;"/>{{ selected }}
  </div>
</template>

<script>
    export default {
    data(){
      return {
        selected: 'A',
        options: [
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', TeacherName: 'C' }
        ]
      }
    }
    }
</script>

<style scoped>

</style>
