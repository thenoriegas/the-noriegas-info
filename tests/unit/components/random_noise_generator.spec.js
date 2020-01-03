/*global spyOn*/

import { shallowMount } from '@vue/test-utils'
import RandomNoiseGenerator from '@/components/RandomNoiseGenerator.vue'

function getFakeAudioContext(oscillator) {
  return {
    createOscillator: function() {
      return oscillator
    }
  }
}

function getFakeOscillator() {
  return {
    connect: function() {},
    frequency: {},
    start: function() {},
    stop: function() {}
  }
}

describe('RandomNoiseGenerator.vue', function() {
  var oscillator
  var randomNoiseGenerator

  beforeEach(function() {
    randomNoiseGenerator = shallowMount(RandomNoiseGenerator).vm
    oscillator = getFakeOscillator()
    randomNoiseGenerator.audioContext = getFakeAudioContext(oscillator)
  });

  describe('handlePlayButtonClick', function() {
    describe('when playing', function() {
      beforeEach(function() {
        randomNoiseGenerator.isPlaying = true
      })

      it('sets isPlaying to false', function() {
        randomNoiseGenerator.handlePlayButtonClick()
        expect(randomNoiseGenerator.isPlaying).toEqual(false)
      })

      it('does not play any notes', function() {
        spyOn(randomNoiseGenerator, 'playRandomNote')
        randomNoiseGenerator.handlePlayButtonClick()
        expect(randomNoiseGenerator.playRandomNote).not.toHaveBeenCalled()
      })
    })

    describe('when not playing', function() {
      beforeEach(function() {
        randomNoiseGenerator.isPlaying = false
      })

      it('sets isPlaying to true', function() {
        randomNoiseGenerator.handlePlayButtonClick()
        expect(randomNoiseGenerator.isPlaying).toEqual(true)
      })

      it('plays a random note', function() {
        spyOn(randomNoiseGenerator, 'playRandomNote')
        randomNoiseGenerator.handlePlayButtonClick()
        expect(randomNoiseGenerator.playRandomNote).toHaveBeenCalled()
      })
    })
  })

  describe('playRandomNote', function() {
    describe('when playing', function() {
      beforeEach(function() {
        randomNoiseGenerator.isPlaying = true
      })

      it('plays a frequency within the range', function() {
        randomNoiseGenerator.frequencyRange = [440, 440]
        randomNoiseGenerator.playRandomNote()
        expect(oscillator.frequency.value).toEqual(440)
      })

      it('plays at a duration within the range', function() {
        randomNoiseGenerator.audioContext.currentTime = 1
        randomNoiseGenerator.durationRange = [1, 1]
        spyOn(oscillator, 'stop').and.callFake(function() {})
        randomNoiseGenerator.playRandomNote()
        expect(oscillator.stop).toHaveBeenCalledWith(2)
      })

      it('plays the specified wave type', function() {
        randomNoiseGenerator.waveType = 'square'
        randomNoiseGenerator.playRandomNote()
        expect(oscillator.type).toEqual('square')
      })
    })

    describe('when not playing', function() {
      beforeEach(function() {
        randomNoiseGenerator.isPlaying = false
      })

      it('does not create an oscillator', function() {
        spyOn(randomNoiseGenerator.audioContext, 'createOscillator')
        randomNoiseGenerator.playRandomNote()
        expect(randomNoiseGenerator.audioContext.createOscillator).not.toHaveBeenCalled()
      })
    })
  })
})
