<template src="./matches.component.html"></template>
<style src="./matches.component.css"></style>
<style src="./loader.css"></style>

<script>
  import { LeaguesServices } from '@/services/leagues.services';
  import { MatchesServices } from '@/services/matches.services';
  import MatchPairComponent from '@/components/matchPair/matchPair.component.vue'

  export default {
    name: 'MatchesComponent',
    props: {},
    components: {
      MatchPairComponent
    },
    data: () => ({
      leagues: [],
      matches: [],
      competition: {},
      selectedLeague: '',
      timePeriod: [
        {value: 'today',        label: "Hoy"},
        {value: 'week',         label: "Semana"},
        {value: 'halfmonth',    label: "Mitad de mes"},
        {value: 'month',        label: "Mes"},
        {value: 'quarteryear',  label: "Cuarto de Año"},
        {value: 'year',         label: "Año"},
      ],
      selectedTimePeriod: '',
      requested: false,
      searching: false,
    }),
    mounted() {
      LeaguesServices
        .getLeagues()
        .then( 
          leaguesList => {
            this.leagues = leaguesList;
          }
        );
    },
    methods: {
      requestMatches() {
        this.searching = true;
        this.matches = [];
        this.competition = {};
        MatchesServices.getMatches(
          this.selectedTimePeriod,
          this.selectedLeague
        )
        .then(
          result => {
            this.matches = result.matches;
            this.competition = result.competition;
            this.requested = true;
            this.searching = false;
          }
        );
      }
    }
  }
</script>