<template>
  <div>
    <PanelGroup />

    <div v-if="figure == 'BarChart'">
      <figure class="col-10 offset-1">
        <v-chart
          :option= "bar"
          :init-options="initOptions"
          ref="bar"
          theme="ovilia-green"
          autoresize
          :loading="barLoading"
          :loadingOptions="barLoadingOptions"
          @zr:click="handleZrClick"
          @click="handleClick"
        />
      </figure>
    </div>
    <div v-else >
      <figure class="col-9 offset-2">
        <v-chart
          :option="pie"
          :init-options="initOptions"
          ref="pie"
          autoresize
        />
      </figure>
    </div>

    <div class="col-12" align="center">
      <figure style="background-color: #404a59;" class='mx-10'>
        <v-chart
          :option="map"
          :init-options="initOptions"
          ref="map"
          autoresize
        />
      </figure>
    </div>
  </div>
</template>

<script>
import PanelGroup from "./PanelGroup"
import { mapState } from "vuex"
import store from '../store/index'

import * as echarts from "echarts/core"
import ECharts from 'vue-echarts'

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import { BarChart, PieChart, MapChart, EffectScatterChart, ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, ParallelComponent, GeoComponent, ToolboxComponent, LegendComponent, TimelineComponent, VisualMapComponent, DataZoomComponent, MarkPointComponent } from 'echarts/components'

import getBar from "../mock/bar"
import pie from "../mock/pie"
import map from "../mock/map";
import theme from "../mock/theme.json"
import chinaMap from "../mock/china.json";

const { use, registerMap, registerTheme } = echarts;

use([
  CanvasRenderer,
  SVGRenderer,
  BarChart,
  PieChart,
  MapChart,
  ScatterChart,
  EffectScatterChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ParallelComponent,
  GeoComponent,
  ToolboxComponent,
  LegendComponent,
  TimelineComponent,
  VisualMapComponent,
  DataZoomComponent,
  MarkPointComponent
]);

registerTheme("ovilia-green", theme);

// registering map data
registerMap("china", chinaMap);

export default {
  components: {
    PanelGroup,
    "v-chart": ECharts
  },
  data() {
    return {
      bar: getBar(),
      initOptions: {
        renderer: "canvas"
      },
      barLoading: false,
      barLoadingOptions: {
        text: "Loading…",
        color: "#4ea397",
        maskColor: "rgba(255, 255, 255, 0.4)"
      },
      pie,
      map,
      seconds: -1
    }
  },
  computed: {
    ...mapState({
      figure: (state) => state.admin.figure
    })
  },
  methods: {
    handleClick(...args) {
      console.log("click from echarts", ...args);
    },
    handleZrClick(...args) {
      console.log("click from zrender", ...args);
    },
    changeChartTab(chartType) {
      store.commit('switchFigure', chartType);
    },
    refresh() {
      // simulating async data from server
      this.seconds = 3;
      this.barLoading = true;
      const timer = setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          clearTimeout(timer);
          this.barLoading = false;
          this.bar = getBar();
        }
      }, 1000);
    },
    startActions() {
      let dataIndex = -1;
      const pie = this.$refs.pie;
      if (!pie) {
        return;
      }
      const dataLen = pie.option.series[0].data.length;
      this.actionTimer = setInterval(() => {
        pie.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex
        });
        dataIndex = (dataIndex + 1) % dataLen;
        pie.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex
        });
        // 显示 tooltip
        pie.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex
        });
      }, 1000);
    }
  },
  mounted() {
    this.startActions();
  }
}
</script>

<style>
figure {
  width: 450px;
  height: 300px;
}
</style>
