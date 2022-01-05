const DEFAULT_AVATAR_SRC = './assets/images/avatar.png';
const DEFAULT_DATA = [{
    color: "#0d6efd",
    avatar: DEFAULT_AVATAR_SRC,
    name: "1",
}, {
    color: "#dc3545",
    avatar: DEFAULT_AVATAR_SRC,
    name: "2",
}, {
    color: "#fd7e14",
    avatar: DEFAULT_AVATAR_SRC,
    name: "3",
}, {
    color: "#ffc107",
    avatar: DEFAULT_AVATAR_SRC,
    name: "4",
}, {
    color: "#198754",
    avatar: DEFAULT_AVATAR_SRC,
    name: "5",
}, ];
const AUDIO_START_SRC = [{
    src: './assets/audio/Xo-So-Mien-Bac-Nhac-Chuong-V-A-V-A.mp3',
    label: 'Xố số kiến thiết',
}, {
    src: './assets/audio/Nhac-nen-game-show-ai-la-trieu-phu-www_tiengdong_com.mp3',
    label: 'Ai là triệu phú',
}, {
    src: './assets/audio/Tieng-coi-xe-canh-sat-www_tiengdong_com.mp3',
    label: 'Còi xe cảnh sát',
}, {
    src: './assets/audio/Tieng-cong-nong-www_tiengdong_com.mp3',
    label: 'Tiếng công nông',
}, {
    src: './assets/audio/Tieng-xe-cap-cuu-chay-tren-duong-pho-www_tiengdong_com.mp3',
    label: 'Tiếng xe cấp cứu',
}, {
    src: './assets/audio/Tieng-xe-may-www_tiengdong_com.mp3',
    label: 'Tiếng xe máy',
}, {
    src: './assets/audio/Tieng-may-do-nhip-tim-keu-www-tiengdong_com.mp3',
    label: 'Tiếng máy đo nhịp tim',
}, {
    src: './assets/audio/Tieng-dam-dong-la-het-hoang-so-www_tiengdong_com.mp3',
    label: 'Tiếng la hét',
}, {
    src: './assets/audio/Nhac-chuong-nhay-nhay-di-may-tang-tang-tang-www_tiengdong_com.mp3',
    label: 'Tăng tăng tăng',
}, ];
const AUDIO_END_SRC = [{
    src: './assets/audio/Hieu-ung-am-thanh-na-ni-www_tiengdong_com.mp3',
    label: 'Nà ní',
}, {
    src: './assets/audio/Tieng-sung-ban-qua-kinh-cua-so-www_tiengdong_com.mp3',
    label: 'Tiếng súng',
}, {
    src: './assets/audio/Tieng-dong-cua-va-tieng-het-kinh-di-www_tiengdong_com.mp3',
    label: 'Kinh dị',
}, {
    src: './assets/audio/Tieng-cuoi-den-khan-ca-giong-tiktok-www_tiengdong_com.mp3',
    label: 'Tiếng cười 1',
}, {
    src: './assets/audio/Am-thanh-ai-oi-si-ma-tiktok-www_tiengdong_com.mp3',
    label: 'Tiếng cười 2',
}, {
    src: './assets/audio/chienthang.mp3',
    label: 'Chiến thắng 1',
}, {
    src: './assets/audio/chienthang2.mp3',
    label: 'Chiến thắng 2',
}, {
    src: './assets/audio/thuacuoc1.mp3',
    label: 'Thua cuộc 1',
}, {
    src: './assets/audio/thuacuoc2.mp3',
    label: 'Thua cuộc 2',
}, {
    src: './assets/audio/Tieng-vo-tay-1.mp3',
    label: 'Tiếng vỗ tay 1',
}, {
    src: './assets/audio/Tieng-vo-tay-2.mp3',
    label: 'Tiếng vỗ tay 1',
}, {
    src: './assets/audio/Am-thanh-tra-loi-dung-ai-la-trieu-phu-www_tiengdong_com.mp3',
    label: 'Ai là triệu phú 1',
}, {
    src: './assets/audio/Am-thanh-tra-loi-sai-ai-la-trieu-phu-www_tiengdong_com.mp3',
    label: 'Ai là triệu phú 2',
}, ]

const app = {
    init() {
        this.canvas = document.getElementById('wheel-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.modalWrapper = document.querySelector('.modal-wrapper');
        this.audioStart = document.getElementById('audio-run');
        this.audioStart.src = AUDIO_START_SRC[0].src;
        this.audioEnd = document.getElementById('audio-end');
        this.audioEnd.src = AUDIO_END_SRC[0].src;
        this.spinBtn = document.querySelector('.spin');
        this.addBtn = document.querySelector('.add-btn');
        this.addInput = document.querySelector('.add-input');
        this.list = document.querySelector('.nav-list .list-group');
        this.audioStartSelect = document.getElementById('audio-start-select');
        this.audioEndSelect = document.getElementById('audio-end-select');

        this.data = JSON.parse(localStorage.getItem('wheel')) || DEFAULT_DATA;
        this.isRunning = false;
    },

    handleEvents() {

        this.modalWrapper.addEventListener('click', (e) => {
            const isCloseBtn = e.target.closest('.modal-close');
            const isOverlay = e.target.closest('.modal-overlay');
            if (isCloseBtn || isOverlay) {
                this.modalWrapper.innerHTML = '';
            }
        })

        this.spinBtn.addEventListener('click', () => {
            this.run();
            this.audioStart.play();
        })

        this.audioStartSelect.addEventListener('change', (e) => {
            this.audioStart.src = e.target.value;
        })

        this.audioEndSelect.addEventListener('change', (e) => {
            this.audioEnd.src = e.target.value;
        })

        this.addInput.addEventListener('keydown', (e) => {
            if (e.code !== 'Enter') return;
            this.handleAdd();
        })

        this.addBtn.addEventListener('click', () => {
            this.handleAdd();
        })

        this.list.addEventListener('click', (e) => {
            const isDeleteBtn = e.target.closest('.delete-item');
            if (isDeleteBtn) {
                const index = e.target.dataset.index;
                this.data.splice(index, 1);
                this.renderList();
                this.drawWheel();
                this.saveStorage();
            }
        })

        document.querySelector('.sort-random-btn').addEventListener('click', () => {
            this.data.sort(() => 0.5 - Math.random());
            this.saveStorage();
            this.renderList();
            this.drawWheel();
        })

        document.querySelector('.show-index-btn').addEventListener('click', (e) => {
            this.list.classList.toggle('list-group-numbered');
            if (this.list.classList.contains('list-group-numbered')) {
                e.target.innerHTML = 'Ẩn STT';
            } else {
                e.target.innerHTML = 'Hiện STT';
            }
        })

        document.querySelector('.random-color-btn').addEventListener('click', () => {
            this.data.forEach(item => {
                item.color = this.randomColor();
            })
            this.saveStorage();
            this.renderList();
            this.drawWheel();
        })

        document.querySelector('.delete-all-btn').addEventListener('click', () => {
            this.data.length = 0;
            this.saveStorage();
            this.renderList();
            this.drawWheel();
        })
    },

    handleAdd() {
        if (!this.addInput.value) return;
        this.data.push({
            name: this.addInput.value,
            color: this.randomColor(),
            avatar: DEFAULT_AVATAR_SRC,
        });
        this.renderList();
        this.drawWheel();
        this.addInput.value = '';
        this.addInput.focus();
        this.saveStorage();
    },

    drawWheel() {
        let textDeg = 360 / this.data.length / 2;
        let lastend = -0.5 * Math.PI;
        let off = 0;
        let w = (this.canvas.width - off) / 2;
        let h = (this.canvas.height - off) / 2;
        for (let i = 0; i < this.data.length; i++) {

            this.ctx.fillStyle = this.data[i].color;
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.moveTo(w, h);
            const len = (360 / this.data.length / 360) * 2 * Math.PI;
            const mid = lastend + len / 2
            const r = h - off / 2;

            this.ctx.arc(w, h, r, lastend, lastend + len, false);
            this.ctx.lineTo(w, h);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();


            this.drawText(i, w, h, mid, r, textDeg);
            this.drawAvatar(i, w, h, mid, r);

            textDeg += 360 / this.data.length;
            lastend += Math.PI * 2 * (360 / this.data.length / 360);
        }
    },

    drawText(i, w, h, mid, r, textDeg) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${30}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.save();

        if (this.checkAvatar(i)) {
            this.ctx.translate(
                w + Math.cos(mid) * (r / 1.2),
                h + Math.sin(mid) * (r / 1.2),
            );
            this.ctx.rotate(textDeg * Math.PI / 180);
            this.ctx.fillText(
                this.data[i].name,
                0,
                0,
            );
        } else {

            this.ctx.translate(
                w + Math.cos(mid) * (r / 1.8),
                h + Math.sin(mid) * (r / 1.8),
            );
            this.ctx.rotate((textDeg - 90) * Math.PI / 180);
            this.ctx.fillText(
                this.data[i].name,
                0,
                0,
            );

        }


        this.ctx.restore();
        this.ctx.closePath();
    },

    drawAvatar(i, w, h, mid, r) {
        if (!this.checkAvatar(i)) return;

        const image = new Image();
        image.src = this.data[i].avatar;

        image.addEventListener('load', () => {

            const widthSetter = (this.canvas.width / 2.5 * Math.PI / this.data.length) > 100 ? 100 : (this.canvas.width / 2.5 * Math.PI / this.data.length);
            let imageWidth, imageHeight;

            if (image.width < image.height) {
                imageWidth = widthSetter;
                imageHeight = image.height / (image.width / widthSetter);
            } else {
                imageHeight = widthSetter;
                imageWidth = image.width / (image.height / widthSetter);
            }

            const ratio = Math.min(imageWidth, imageHeight);
            const angle = 2;

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(
                w + Math.cos(mid) * (r / angle),
                h + Math.sin(mid) * (r / angle),
                ratio / 2,
                0,
                2 * Math.PI
            );
            this.ctx.clip();
            this.ctx.drawImage(
                image,
                w + Math.cos(mid) * (r / angle) - imageWidth / 2,
                h + Math.sin(mid) * (r / angle) - imageHeight / 2,
                imageWidth,
                imageHeight,
            )
            this.ctx.restore();
            this.ctx.closePath();
        })
    },

    renderAudioStart() {
        let html = '';
        for (let i = 0; i < AUDIO_START_SRC.length; i++) {
            html += `
                <option ${i === 0 ? 'selected' : ''} value="${AUDIO_START_SRC[i].src}">
                    ${AUDIO_START_SRC[i].label}
                </option>
            `;
        }
        this.audioStartSelect.innerHTML = html;
    },

    renderAudioEnd() {
        let html = '';
        for (let i = 0; i < AUDIO_END_SRC.length; i++) {
            html += `
                <option ${i === 0 ? 'selected' : ''} value="${AUDIO_END_SRC[i].src}">
                    ${AUDIO_END_SRC[i].label}
                </option>
            `;
        }
        this.audioEndSelect.innerHTML = html;
    },

    renderList() {
        let html = '';
        for (let i = 0; i < this.data.length; i++) {
            html += `
                <li class="list-group-item d-flex align-items-center">
                    <span class="ms-2 d-inline-block">${this.data[i].name}</span>
                    <img src="${this.data[i].avatar}" class="item-avatar" onerror="this.src='${DEFAULT_AVATAR_SRC}'"/>
                    <input type="file" hidden id="input-file-${i}" class="input-file"/>
                    <div class="ms-auto d-flex align-items-center">
                        <label for="input-file-${i}" class="btn btn-primary btn-sm me-2">Chọn ảnh</label>
                        <input value="${this.data[i].color}" type="color" class="color-input me-2" />
                        <svg data-index="${i}" style="cursor: pointer" class="delete-item" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path data-index="${i}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </li>
            `;
        }
        this.list.innerHTML = html;

        document.querySelectorAll('.input-file').forEach((input, index) => {
            input.addEventListener('change', () => {
                const files = input.files;
                if (files.length) {
                    const src = URL.createObjectURL(files[0]);
                    this.data[index].avatar = src;
                    this.drawWheel();
                    this.renderList();
                }
            })
        })

        document.querySelectorAll('.color-input').forEach((input, index) => {
            input.addEventListener('input', () => {
                this.data[index].color = input.value;
                this.drawWheel();
            })
        })
    },

    saveStorage() {
        localStorage.setItem('wheel', JSON.stringify(this.data));
    },

    modal(data) {
        return `
            <div class="modal modal-dialog-centered" tabindex="-1">
                <div class="modal-overlay"></div>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Bạn đã quay vào ô</h5>
                            <button type="button" class="btn-close modal-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img class="modal-avatar" src="${data.avatar}" alt="" onerror="this.src='${DEFAULT_AVATAR_SRC}'">
                            <h2 style="color: ${data.color}" class="mt-2">${data.name}</h2>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button class="btn btn-primary modal-close">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    randomColor() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');;
    },

    checkAvatar(i) {
        return this.data[i].avatar !== DEFAULT_AVATAR_SRC;
    },

    render() {
        this.renderAudioStart();
        this.renderAudioEnd();
        this.renderList();
    },

    run() {
        if (this.isRunning) return;

        let interval = 10;
        let timeout = 10000 + Math.floor(Math.random() * 5000);
        let deg = 0;
        let acceleration = 10;
        let result;
        this.interval = setInterval(() => {
            deg += acceleration
            this.canvas.style = `transform: rotate(${deg}deg)`;
            acceleration -= (interval / (timeout / 10));
            result = this.data.length - Math.ceil(deg % 360 / (360 / this.data.length));
            this.spinBtn.style = `background-color: ${this.data[result].color}`;
        }, interval)
        this.isRunning = true;

        setTimeout(() => {
            clearInterval(this.interval);
            this.audioStart.load();
            this.audioEnd.play();
            this.modalWrapper.innerHTML = this.modal(this.data[result]);
            this.isRunning = false;
        }, timeout);
    },

    start() {
        this.init();
        this.drawWheel();
        this.render();
        this.handleEvents();
    },
}

app.start();