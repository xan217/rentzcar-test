<template src="./matchPair.component.html"></template>
<style src="./matchPair.component.css"></style>

<script>
  export default {
    name: 'MatchPairComponent',
    props: [
      'match'
    ],
    data: () => ({
      matchDate: ''
    }),
    mounted() {
      this.matchDate = `${this.match.utcDate.substr(8,2)}-${this.match.utcDate.substr(5,2)}-${this.match.utcDate.substr(0,4)}`;
    }
  }
</script>