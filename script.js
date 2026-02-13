const MY_KASPI_PHONE = "+7 771 273 0203"; // ЗАМЕНИ НА СВОЙ НОМЕР БЕЗ + И 8
const BOT_TOKEN = "8227898201:AAGM9cL4CXrKPEbFxMSx-HCW0Zl-5WKv8-E";
const MY_CHAT_ID = "+7 771 273 0203";
const PRICE = 5000;

let selected = new Set();
const grid = document.getElementById('seats-container');

// Генерация 50 мест
for (let i = 1; i <= 50; i++) {
    const s = document.createElement('div');
    s.className = 'seat';
    s.innerText = i;
    s.onclick = () => {
        if (selected.has(i)) {
            selected.delete(i);
            s.classList.remove('selected');
        } else {
            selected.add(i);
            s.classList.add('selected');
        }
        update();
    };
    grid.appendChild(s);
}

function update() {
    document.getElementById('count').innerText = selected.size;
    document.getElementById('total').innerText = (selected.size * PRICE) + " ₸";
}

async function handlePayment() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const sum = selected.size * PRICE;

    if (!name || !phone || selected.size === 0) {
        alert("Заполни поля и выбери номера!");
        return;
    }

    const nums = Array.from(selected).sort((a,b)=>a-b).join(', ');
    const msg = `🎰 НОВЫЙ УЧАСТНИК\n👤 Имя: ${name}\n📞 Тел: ${phone}\n🎫 Номера: ${nums}\n💰 Сумма: ${sum} ₸`;

    try {
        // Отправка в Telegram через GET
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${MY_CHAT_ID}&text=${encodeURIComponent(msg)}`);
        
        // Переход в Kaspi
        window.location.href = `https://pay.kaspi.kz/pay/transfer?phone=${MY_KASPI_PHONE}&amount=${sum}`;
    } catch (e) {
        alert("Ошибка сети!");
    }
}


