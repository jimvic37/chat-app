import moment from 'moment';
// const moment = require('moment');

function momentServices(utc_time) {
  const utcTime = moment.utc(utc_time);
  const time = utcTime.local();

  moment.updateLocale('en', {
      relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: number=>number + "s ago",
          ss: '%ds ago',
          m: "1m ago",
          mm: "%dm ago",
          h: "1h ago",
          hh: "%dh ago",
          d: "1d ago",
          dd: "%dd ago",
          M: "a month ago",
          MM: "%d months ago",
          y: "a year ago",
          yy: "%d years ago"
      }
  });

  let secondsElapsed = moment().diff(time, 'seconds');
  let dayStart = moment("2018-01-01").startOf('day').seconds(secondsElapsed);

  if (secondsElapsed > 300) {
      return moment(time).fromNow(true);
  } else if (secondsElapsed < 60) {
      return dayStart.format('s') + 's ago';
  } else {
      return dayStart.format('m:ss') + 'm ago';
  }
};

export default momentServices;

// test

// console.log(momentServices('2021-07-01T18:00:00.000Z')); // 1m ago
// console.log(momentServices('2023-10-31 11:23:29.441534')); // 1m ago
