<template>
  <div id="app">
    <div class="icon-links">
      <a href="https://twitter.com/the_noriegas" target="_blank"><i class="fab fa-twitter ui-icon" /></a>
      <a href="https://instagram.com/the_noriegas" target="_blank"><i class="fab fa-instagram ui-icon" /></a>
      <a href="https://github.com/thenoriegas" target="_blank"><i class="fab fa-github ui-icon" /></a>
      <a href="https://noriegas.bandcamp.com" target="_blank"><i class="fab fa-bandcamp ui-icon" /></a>
    </div>
    <div class="icon-links" ref="noiseGeneratorLinks">
      <i class="fa fa-plus ui-icon ui-icon__medium" v-on:click="randomNoiseGeneratorCount += 1" v-if="randomNoiseGeneratorCount < maxRandomNoiseGeneratorCount"></i>
      <i class="fa fa-minus ui-icon ui-icon__medium" v-on:click="randomNoiseGeneratorCount -= 1" v-if="randomNoiseGeneratorCount > 1"></i>
    </div>
    <div class="random-noise-generators" ref="noiseGeneratorSection">
      <div class="random-noise-generator-wrapper"
           v-for="n in randomNoiseGeneratorCount"
           ref="noiseGenerators"
           :key="n">
        <RandomNoiseGenerator />
      </div>
    </div>
  </div>
</template>

<script>
import RandomNoiseGenerator from './components/RandomNoiseGenerator.vue'
import './assets/fonts/fontawesome/css/all.css'

export default {
  name: 'App',
  components: {
    RandomNoiseGenerator
  },
  data: function() {
    return {
      maxRandomNoiseGeneratorCount: 2,
      randomNoiseGeneratorCount: 1
    }
  },
  methods: {
    updateMaxRandomNoiseGeneratorCount: function() {
      if (!this.$refs.noiseGeneratorLinks || !this.$refs.noiseGenerators || (Date.now() - this.lastCompletionTime < 100)) {
        return
      }
      var noiseGeneratorLinkBottom = this.$refs.noiseGeneratorLinks.offsetTop + this.$refs.noiseGeneratorLinks.offsetHeight
      var firstNoiseGenerator = this.$refs.noiseGenerators[0]
      var verticalCount = Math.floor((window.innerHeight - noiseGeneratorLinkBottom) / firstNoiseGenerator.offsetHeight)
      var horizontalCount = Math.floor(window.innerWidth / firstNoiseGenerator.offsetWidth)
      this.maxRandomNoiseGeneratorCount = Math.max(verticalCount * horizontalCount, 1)
      this.randomNoiseGeneratorCount = Math.min(this.randomNoiseGeneratorCount, this.maxRandomNoiseGeneratorCount)
      this.lastCompletionTime = Date.now()
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.updateMaxRandomNoiseGeneratorCount)
  },
  updated: function () {
    this.updateMaxRandomNoiseGeneratorCount()
  }
}
</script>

<style>
@font-face {
  font-family: 'Proxima Soft Regular';
  src: url(assets/fonts/proxima-nova-soft-regular.otf);
}

@font-face {
  font-family: 'Proxima Soft Bold';
  src: url(assets/fonts/proxima-nova-soft-bold.otf);
}

body {
  background: url(assets/images/ndot.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.icon-links {
  text-align: center;
}

.ui-icon {
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 48px;
  margin: 16px;
}

@media only screen and (max-width: 350px) {
  .ui-icon {
    font-size: 36px;
  }
}

.ui-icon:hover {
  color: #678ffe;
}

.ui-icon.ui-icon__medium {
  font-size: 36px;
}

.ui-icon.ui-icon__small {
  font-size: 18px;
}

.ui-icon.selected {
  color: #678ffe;
}

.random-noise-generators {
  bottom: 0;
  left: 0;
  position: absolute;
  text-align: center;
  right: 0;
}

.random-noise-generator-wrapper {
  display: inline-block;
}

</style>
