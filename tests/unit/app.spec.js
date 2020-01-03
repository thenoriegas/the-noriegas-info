import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

function setupApp(noiseGeneratorRowCount, noiseGeneratorColumnCount) {
  const app = shallowMount(App).vm
  const offsetHeight = 1
  app.$refs = {
    noiseGeneratorLinks: {
      offsetHeight: offsetHeight,
      offsetTop: 0
    },
    noiseGenerators: [
      {
        offsetHeight: 1,
        offsetWidth: 1
      }
    ]
  }
  global.window = Object.create(window);
  Object.defineProperty(window, 'innerHeight', {
    value: noiseGeneratorRowCount + offsetHeight
  })
  Object.defineProperty(window, 'innerWidth', {
    value: noiseGeneratorColumnCount
  })
  return app
}

describe('App.vue', function() {
  var app

  describe('updateMaxRandomNoiseGeneratorCount', function() {
    describe('in a 4 by 5 grid', function() {
      beforeEach(function() {
        app = setupApp(4, 5)
      })

      it('sets the max random noise generator count to 20', function() {
        app.updateMaxRandomNoiseGeneratorCount()
        expect(app.maxRandomNoiseGeneratorCount).toEqual(20)
      })
    });
  })
})
