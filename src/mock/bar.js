function random() {
    return Math.round(300 + Math.random() * 700) / 10;
  }
  
  export default function getData() {
    return {
      title: {
        text: "Recent Active Customers",
        left: "center",
        textStyle: {
          fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
        }
      },
      xAxis: {
          type: 'category',
          data: ['April', 'May', 'June', 'July']
      },
      yAxis: {},
      series: [
          {
              type: 'bar',
              name: '2015',
              data: [89.3, 92.1, 94.4, random()]
          },
          {
              type: 'bar',
              name: '2016',
              data: [95.8, 89.4, 91.2, 76.9]
          },
          {
              type: 'bar',
              name: '2017',
              data: [97.7, 83.1, 92.5, 78.1]
          }
      ]

    };
  }