<script lang="ts">
  import ApexCharts from "apexcharts"
  import { contacts } from "../../stores/contacts"
  import { onMount } from "svelte"
  import type { Contact } from "../../models/contact";

  export let contactIds: number[]

  let canvas: HTMLElement
  let chart: ApexCharts

  let eventsWithContact: Record<number, number>
  $: eventsWithContact = contactIds.reduce((acc, id) => {
    if (acc[id] === undefined) {
      acc[id] = 0
    }
    acc[id] += 1
    return acc
  }, {} as Record<number, number>)

  $: if (chart) {
    const categories: string[] = []
    const percentageEvents: number[] = []

    Object.entries(eventsWithContact)
      .sort((a, b) => b[1] - a[1])
      .forEach(([id, times]) => {
        const { first_name, last_name } = $contacts.find((c) => c.id.toString() === id) as Contact
        categories.push(first_name + (last_name ? " " + last_name : ""))
        percentageEvents.push(Math.round((times * 100) / Object.keys(eventsWithContact).length))
      })

    chart.updateOptions({ xaxis: { categories } })
    chart.updateSeries([{ name: "% events", data: percentageEvents }])
  }

  onMount(() => {
    chart = new ApexCharts(canvas, {
      chart: {
        type: "bar",
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1,
            },
          },
        },
      },
      series: [
        {
          name: "% events",
          data: [],
        },
      ],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        tickPlacement: "on",
      },
      yaxis: [
        {
          title: { text: "% of events" },
        },
      ],
      noData: {
        text: "Loading...",
      },
    })

    chart.render()
  })
</script>

<div bind:this={canvas} />
