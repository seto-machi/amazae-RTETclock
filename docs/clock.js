function rtclockin() {
    let today = new Date();
    let hour = today.getHours().toString().padStart(2, '0');
    let minute = today.getMinutes().toString().padStart(2, '0');
    let seconds = today.getSeconds().toString().padStart(2, '0');
    const rh = window.document.querySelector(".hourandminutes");
    const rm = window.document.querySelector(".seconds");

    rh.innerHTML = hour + ':' + minute;
    rm.innerHTML = seconds;
}

setInterval(rtclockin, 1000);

const SEC_MINUTES = 60;
const SEC_HOURS = SEC_MINUTES * 60;
const SEC_DATE = SEC_HOURS * 24;
const SEC_MONTH = SEC_DATE * 32;
const SEC_YEAR = SEC_MONTH * 12;

/**
 * Calculate to Eorzea time from real-world time with UNIX epoch time.
 * If argument is not present, current time is assigned.
 * example
 * ```ts
 * const et = eorzeatime();
 * ```
 */


function eorzeatime(t) {
    const epoch = Math.floor((t ?? Math.floor(Date.now() / 1000)) * 144 / 7);

    const r1 = epoch % SEC_YEAR;
    const r2 = r1 % SEC_MONTH;
    const r3 = r2 % SEC_DATE;
    const r4 = r3 % SEC_HOURS;

    const year = Math.floor(epoch / SEC_YEAR) + 1;
    const month = Math.floor(r1 / SEC_MONTH) + 1;
    const date = Math.floor(r2 / SEC_DATE) + 1;
    const hours = Math.floor(r3 / SEC_HOURS);
    const minutes = Math.floor(r4 / SEC_MINUTES);
    const seconds = r4 % SEC_MINUTES;

    const evenMonth = month % 2 === 0;

    const monthState = evenMonth ? "Umbral" : "Astral";
    const monthWithState = (evenMonth ? month : month + 1) / 2;

    return { epoch, year, month, date, hours, minutes, seconds, monthState, monthWithState };
}

function etclockin() {
    const ettimer = window.document.querySelector(".ettimer");
    const etime = eorzeatime(Math.floor(Date.now() / 1000));
    const ehem = etime["hours"].toString().padStart(2, '0') + ':' + etime["minutes"].toString().padStart(2, '0');
    ettimer.innerHTML = ehem;
}

setInterval(etclockin, 1000);
