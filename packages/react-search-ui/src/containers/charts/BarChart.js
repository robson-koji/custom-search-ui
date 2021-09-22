import PropTypes from "prop-types";
import { Component } from "react";
import { withSearch } from "../..";
import { BarChart } from "@elastic/react-search-ui-views";
import * as d3 from "d3";

export class BarChartContainer extends Component {
  static propTypes = {
    // Props
    data: PropTypes.string.isRequired,
    charts: PropTypes.string,
    wos_div: PropTypes.string,
    // charts.numero_citacoes: PropTypes.array,
    // charts.ano_publicacao_exact: PropTypes.array,

    view: PropTypes.func
  };

  componentDidMount() {
    this.drawChart();
  }
  componentDidUpdate() {
    d3.select("svg").remove();
    this.drawChart();
  }

  drawChart() {
    // debugger;
    // d3.selectAll("svg > *").remove();
    let wos_pub_data;

    if (this.props.data === "numero_citacoes") {
      wos_pub_data = this.props.charts.numero_citacoes;
    } else {
      wos_pub_data = this.props.charts.ano_publicacao_exact;
    }
    let titulo = this.props.titulo;
    let wos_div = this.props.wos_div;
    let width = 400;

    var margin = { top: 20, right: 7, bottom: 20, left: 47 },
      height = 100 - margin.top - margin.bottom;
    width = width - margin.left - margin.right;

    var x = d3.scaleBand().rangeRound([0, width], 0.5);
    var y = d3.scaleLinear().range([height, 0]);

    // var wos_div = '#' + div_id
    var svg = d3
      .select(wos_div)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", 5)
      .attr("y", -5)
      // .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text(titulo);

    x.domain(
      wos_pub_data.map(function(d) {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(wos_pub_data, function(d) {
        return d.value;
      })
    ]);

    var xAxis = d3
      .axisBottom()
      .tickSizeOuter(0)
      .scale(x)
      // .orient("bottom")
      .tickValues(
        x.domain().filter(function(d) {
          return d % 5 === 0;
        })
      );

    var xAxis2 = d3
      .axisTop()
      .tickSizeOuter(0)
      .scale(x)
      // .orient("top")
      .tickValues([]);

    // debugger;
    var yAxis = d3
      .axisLeft()
      .scale(y)
      // .orient("left")
      .tickFormat(d3.format("d"))
      .tickValues(y.domain());

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "1.2em")
      .style("font-size", "1em");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,0)")
      .call(xAxis2);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .selectAll("line")
      .style("stroke", "lightgrey")
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "1em");

    svg
      .selectAll("path")
      .style("stroke", "lightgrey")
      .style("s");

    svg
      .selectAll("bar")
      .data(wos_pub_data)
      .enter()
      .append("rect")
      .style("fill", "#3366cc")
      .attr("x", function(d) {
        return x(d.date);
      })
      .attr("width", x.bandwidth() * 0.8)
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("height", function(d) {
        return d.value === 0 ? 0 : height - y(d.value);
      });
  }

  render() {
    // console.log('!!!aqui')
    // console.log(this.props.charts.numero_citacoes)
    // debugger;
    const { charts, view, ...rest } = this.props;

    const View = view || BarChart;

    return View({
      charts,
      ...rest
    });
  }
}

export default withSearch(({ charts }) => ({
  charts
}))(BarChartContainer);
