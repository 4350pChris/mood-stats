<style>
  table {
    @apply table-fixed w-full border-collapse;
  }

  table,
  td,
  th {
    @apply border;
  }

  td {
    width: calc(100% / 7);
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import CalendarDay from "./CalendarDay.svelte"
  import CalendarControls from "./CalendarControls.svelte"

  export let month: number
  export let year: number

  let firstOfNextMonth: Date
  $: firstOfNextMonth = new Date(year, month, 1)

  let firstOfThisMonth: Date
  $: firstOfThisMonth = new Date(year, month - 1, 1)

  let prevMonth: Date[]
  $: prevMonth = calculatePreviousMonthCarryover(year, month)

  let nextMonth: Date[]
  $: nextMonth = calculateNextMonthCarryover(year, month)

  let daysInMonth: number
  $: daysInMonth = new Date(year, month, 0).getDate()

  let currentMonth: Date[]
  $: currentMonth = currentMonthDates(year, month)

  let weekdays: string[]
  $: weekdays = getWeekdays(navigator.language)

  let buckets: Date[][]
  $: buckets = [...prevMonth, ...currentMonth, ...nextMonth].reduce((acc, day, i) => {
    const n = Math.floor(i / 7)
    if (acc[n] === undefined) {
      acc[n] = []
    }
    acc[n].push(day)
    return acc
  }, [] as Date[][])

  function getWeekdays(locale: string) {
    // just use a static date... Jan 05 1970 is a Monday
    let d = new Date(1970, 0, 5)
    const weekdays: string[] = []
    for (let i = 0; i < 7; i++) {
      weekdays.push(d.toLocaleDateString(locale, { weekday: "long" }))
      d.setDate(d.getDate() + 1)
    }
    return weekdays
  }

  function currentMonthDates(year: number, month: number): Date[] {
    const current: Date[] = []
    let d = new Date(firstOfThisMonth)
    while (d < firstOfNextMonth) {
      current.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
    return current
  }

  function calculatePreviousMonthCarryover(year: number, month: number): Date[] {
    const prev: Date[] = []
    let d = new Date(year, month - 1, 0)
    while (d.getDay() !== 0) {
      prev.push(new Date(d))
      d.setDate(d.getDate() - 1)
    }
    return prev.reverse()
  }

  function calculateNextMonthCarryover(year: number, month: number): Date[] {
    const next: Date[] = []
    let d = new Date(firstOfNextMonth)
    while (d.getDay() !== 1) {
      next.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
    return next
  }
</script>

<CalendarControls bind:year bind:month />
<table>
  <tr>
    {#each weekdays as weekday}
      <th class="font-normal">{weekday}</th>
    {/each}
  </tr>
  {#each buckets as bucket}
    <tr>
      {#each bucket as day}
        <td class="sm:h-16 md:h-20 lg:h-24 xl:h-32">
          <CalendarDay {day} current={firstOfThisMonth <= day && day < firstOfNextMonth} />
        </td>
      {/each}
    </tr>
  {/each}
</table>
