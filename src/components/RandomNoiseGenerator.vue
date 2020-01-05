<template>
  <div class="random-noise-generator">
    <div class="random-noise-generator-control">
      <div class="play-pause-button">
        <i class="fa fa-pause ui-icon ui-icon__medium" v-if="isPlaying" v-on:click="handlePlayButtonClick" />
        <i class="fa fa-play ui-icon ui-icon__medium" v-if="!isPlaying" v-on:click="handlePlayButtonClick" />
      </div>
      <i class="fas fa-wave-sine ui-icon ui-icon__small"
        v-bind:class="{ selected: waveType === 'sine' }"
        v-on:click="handleSineWaveClick">
      </i>
      <i class="fas fa-wave-square ui-icon ui-icon__small"
        v-bind:class="{ selected: waveType === 'square' }"
        v-on:click="handleSquareWaveClick">
      </i>
      <i class="fas fa-wave-triangle ui-icon ui-icon__small"
        v-bind:class="{ selected: waveType === 'triangle' }"
        v-on:click="handleTriangleWaveClick">
      </i>
    </div>
    <div class="random-noise-generator-control slider-section">
      <label for="frequency-slider" class="slider-label">FREQUENCY</label>
      <vue-slider id="frequency-slider"
                  class="frequency-slider"
                  v-model="frequencyRange"
                  v-bind="frequencyRangeOptions"
                  :enable-cross="false"
                  :marks="frequencyMarks"
                  :tooltip-formatter="frequencyTooltipFormat" />
      <label for="duration-slider" class="slider-label">DURATION</label>
      <vue-slider id="duration-slider"
                  class="duration-slider"
                  v-model="durationRange"
                  v-bind="durationRangeOptions"
                  :enable-cross="false"
                  :marks="durationMarks"
                  :tooltip-formatter="durationTooltipFormat" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

Vue.component('vue-slider', VueSlider)

function randomFloat(min, max) {
  if (min === max) {
    return min
  }
  return Math.random() * max + min
}

function randomInteger(min, max) {
  if (min === max) {
    return min
  }
  return Math.floor(Math.random() * max) + min
}

function rangeSliderOptions(min, max) {
  return {
    dotStyle: {
      'background-color': '#678ffe',
      'border': '2px solid #678ffe',
      'box-shadow': 'none!important'
    },
    labelStyle: {
      'color': '#fff',
      'font-family': 'Proxima Soft Regular'
    },
    max: max,
    min: min,
    processStyle: {
      'background-color': '#678ffe'
    },
    stepStyle: {
      'display': 'none'
    },
    tooltipStyle: {
      'font-family': 'Proxima Soft Regular'
    }
  }
}

export default {
  name: 'RandomNoiseGenerator',
  data: function () {
    return {
      durationMarks: function (val) {
        return (val % 10 == 0) ? { label: `${val} s` } : false
      },
      durationRange: [5, 10],
      durationRangeOptions: rangeSliderOptions(0, 30),
      durationTooltipFormat: '{value} s',
      frequencyMarks: function (val) {
        return (val % 300 == 0) ? { label: `${val} Hz` } : false
      },
      frequencyRange: [220, 880],
      frequencyRangeOptions: rangeSliderOptions(20, 1046),
      frequencyTooltipFormat: '{value} Hz',
      isPlaying: false,
      waveType: 'sine'
    }
  },
  methods: {
    handlePlayButtonClick: function () {
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
        this.playRandomNote()
      }
    },
    handleSineWaveClick: function () {
      this.waveType = 'sine'
    },
    handleSquareWaveClick: function () {
      this.waveType = 'square'
    },
    handleTriangleWaveClick: function () {
      this.waveType = 'triangle'
    },
    playRandomNote: function () {
      if (!this.isPlaying) {
        return
      }

      this.audioContext = this.audioContext || new (window.AudioContext || window.webkitAudioContext)()
      var frequency = randomInteger(this.frequencyRange[0], this.frequencyRange[1])
      var duration = randomFloat(this.durationRange[0], this.durationRange[1])

      var oscillator = this.audioContext.createOscillator()

      oscillator.type = this.waveType
      oscillator.frequency.value = frequency
      oscillator.connect(this.audioContext.destination)
      oscillator.onended = this.playRandomNote
      oscillator.start(0)
      oscillator.stop(this.audioContext.currentTime + duration)
    }
  },
  beforeDestroy: function() {
    this.isPlaying = false
  }
}
</script>

<style scoped>
.random-noise-generator-control {
  display: inline-block;
}

.random-noise-generator {
  width: fit-content;
}

.slider-section {
  bottom: 32px;
  position: relative;
}

.duration-slider, .frequency-slider {
  max-width: 250px;
  min-width: 150px;
}

.frequency-slider {
  margin-bottom: 25px;
}

.slider-label {
  color: #fff;
  font-family: 'Proxima Soft Bold';
  font-size: 12px;
}

.wave-image {
  height: 32px;
  width: 32px;
}

.play-pause-button {
  display: block;
}

</style>
