<template>
  <v-container class="py-6 rules-page">
    <h2 class="text-h5 font-weight-medium text-center mb-6">Rregullat</h2>

    <v-card v-for="section in sections" :key="section.title" outlined class="mb-4">
      <v-card-title class="subtitle-1 font-weight-bold pb-1">
        {{ section.title }}
      </v-card-title>
      <v-card-text class="pt-0">
        <ul class="rules-list">
          <li v-for="(item, index) in section.items" :key="index" v-html="item" />
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Rules extends Vue {
  private sections = [
    {
      title: "Parashikimet",
      items: [
        "Parashikimi duhet bërë <strong>para fillimit të ndeshjes</strong>. Pasi të ketë filluar, nuk mund të ndryshosh më.",
        "Mund të parashikosh ndeshje <strong>paraprakisht</strong> — edhe disa ditë më herët — por jo pas fillimit.",
        "Mund t’i plotësosh një nga një ose të gjitha së bashku; shtyp <strong>Save predictions</strong> kur të kesh gati.",
        "Mund të <strong>ndryshosh parashikimin</strong> sa herë të duash, për sa kohë ndeshja nuk ka filluar ende.",
        "Parashikimet e ruajtura shfaqen përsëri kur hap atë ditë.",
      ],
    },
    {
      title: "Sistemi i pikëve",
      items: [
        "<strong>+3 pikë</strong> — rezultati i saktë (fituesi ose barazimi)",
        "<strong>+1 pikë</strong> — diferenca e saktë e golave (p.sh. fitore me 2 gola diferencë)",
        "<strong>+1 pikë</strong> — rezultati ekzakt (p.sh. 2–1)",
        "Maksimumi është <strong>5 pikë</strong> për ndeshje (3 + 1 + 1).",
        "Shembull: parashikon 2–1, rezultati 2–1 → 5 pikë. Parashikon 2–0, rezultati 3–1 → 4 pikë (fituesi + diferenca). Parashikon 1–0, rezultati 2–1 → 3 pikë (vetëm fituesi).",
      ],
    },
    {
      title: "Kur shihen parashikimet e të tjerëve",
      items: [
        "Pasi ndeshja <strong>ka filluar</strong>, parashikimet e të gjithë shfaqen te skeda <strong>Predict</strong>, poshtë ndeshjes.",
        "Te skeda <strong>History</strong> shfaqen ndeshjet e përfunduara me rezultatin zyrtar dhe pikët e secilit.",
        "Derisa ndeshja të mos ketë filluar, askush nuk sheh parashikimet e të tjerëve.",
      ],
    },
    {
      title: "Renditja dhe përditësimet",
      items: [
        "Te skeda <strong>Rankings</strong> shfaqet tabela e pikëve — kush po e çon garën.",
        "Pikët llogariten vetëm pasi rezultati zyrtar të jetë regjistruar në sistem.",
        "Kur hap një ditë me ndeshje të filluara/përfunduara, rezultatet përditësohen automatikisht nga FotMob.",
        "Nëse diçka mungon, admini mund t’i postojë manualisht përsëri.",
      ],
    },
    {
      title: "Tjera",
      items: [
        "Hyr me emrin tënd — pa fjalëkalim, thjesht zgjidh emrin nga lista.",
        "Mos parashiko me emrin e dikujt tjetër — respekto lojën 🙂",
        "Për çdo pyetje, kontakto adminin (<strong>vigan</strong>).",
      ],
    },
  ];
}
</script>

<style scoped>
.rules-page {
  max-width: 560px;
}

.rules-list {
  text-align: left;
  padding-left: 1.2rem;
  margin: 0;
}

.rules-list li {
  margin-bottom: 0.6rem;
  line-height: 1.5;
  font-size: 15px;
}

.rules-list li:last-child {
  margin-bottom: 0;
}
</style>
