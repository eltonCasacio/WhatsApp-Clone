import { Format } from '../util/Format.js';
import { CameraController } from './CameraController.js';
import { DocumentPreviewController } from './DocumentPreviewController';
import { MicrophoneController } from './MicrophoneController';
import { Firebase } from '../util/Firebase';

export class WhatsAppController {

    constructor() {

        this.initAuth();
        this.elementsPrototype();
        this.loadElemtens();
        this.initEvents();

    }

    initAuth() {
        this._firebase = new Firebase();

        this._firebase.initAuth()
            .then(response => {
                this.el.appContent.css({
                    display: 'flex'
                })

            })
            .catch(err => { console.error(err) })
    }

    initEvents() {


        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', e => {

            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {

            if (e.key === 'Enter') {

                e.preventDefault();

                this.el.btnSavePanelEditProfile.click();
            }

        });

        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML)
        });





        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanel()
            this.el.panelAddContact.show();

            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 50)

        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        });

        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault();

            let formData = new FormData(this)
        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(contact => {

            contact.on('click', e => {

                this.el.main.css({
                    display: 'flex'
                });

                this.el.home.hide();
            });
        });

        this.el.btnAttachContact.on('click', e => {

            this.el.modalContacts.show();
        });

        this.el.btnCloseModalContacts.on('click', e => {
            this.el.modalContacts.hide();
        });




        this.el.btnAttach.on('click', e => {

            e.stopPropagation()
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));


        });



        this.el.btnAttachCamera.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            });

            this._camera = new CameraController(this.el.videoCamera);
        });

        this.el.btnClosePanelCamera.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
            this._camera.stop();
        });

        this.el.btnTakePicture.on('click', e => {

            let dataUrl = this._camera.takePicture();

            this.el.pictureCamera.src = dataUrl;
            this.el.pictureCamera.show();
            this.el.videoCamera.hide();
            this.el.btnReshootPanelCamera.show();
            this.el.containerTakePicture.hide();
            this.el.containerSendPicture.show();

        });

        this.el.btnReshootPanelCamera.on('click', e => {

            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.btnReshootPanelCamera.hide();
            this.el.containerTakePicture.show();
            this.el.containerSendPicture.hide();

        })

        this.el.btnSendPicture.on('click', e => {
            console.log(this.el.pictureCamera)
        })



        this.el.btnAttachDocument.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)'
            });

            this.el.inputDocument.click();

        });

        this.el.inputDocument.on('change', e => {

            if (this.el.inputDocument.files.length) {

                this.el.panelDocumentPreview.css({
                    'height': '1%'
                });

                let file = this.el.inputDocument.files[0];

                this._documentPreviewController = new DocumentPreviewController(file);

                this._documentPreviewController.getPreviewData().then(result => {

                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;

                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();

                    this.el.panelDocumentPreview.css({
                        'height': 'calc(100% - 120px)'
                    });

                }).catch(err => {

                    this.el.panelDocumentPreview.css({
                        'height': 'calc(100% - 120px)'
                    });


                    switch (file.type) {

                        case 'application/vnd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls'
                            break;

                        case 'application/vnd.ms-powerpoint':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt'
                            break;

                        case 'application/msword':
                        case 'application/vnd.oasis.opendocument.text':
                        case 'application/vnd.ms-word.document.macroEnabled.12':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc'
                            break;

                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                            break;
                    }

                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                    this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show();

                });
            }

        });

        this.el.btnSendDocument.on('click', e => {

            console.log('enviando documento...')
        })

        this.el.btnClosePanelDocumentPreview.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
        });

        this.el.btnAttachPhoto.on('click', e => {

            this.el.inputPhoto.click();
        });

        this.el.inputPhoto.on('change', e => {

            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file => {

                console.log(file)
            });
        });

        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel()
            this.el.panelEditProfile.show();

            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 50)

        });

        this.el.btnSendMicrophone.on('click', e => {

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();

            this._microphoneController = new MicrophoneController();

            this._microphoneController.on('ready', musica => {

                this._microphoneController.startRecorder();
            });

            this._microphoneController.on('recordTimer', timer => {
                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer)
            })

        });

        this.el.btnCancelMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecorMicrophone();

        });

        this.el.btnFinishMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();

            this.closeRecorMicrophone();
        });




        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.ctrlKey) {

                e.preventDefault();
                this.el.btnSend.click();
            }
        });

        this.el.inputText.on('keyup', e => {

            if (this.el.inputText.innerHTML.length) {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        });

        this.el.btnSend.on('click', e => {

            console.log('enviando mensagem')
        });

        this.el.btnEmojis.on('click', e => {

            this.el.panelEmojis.toggleClass('open');
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

            emoji.on('click', e => {

                //   = emoji.dataset.unicode
                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {
                    img.classList.add(name)
                });

                this.el.inputPlaceholder.hide();
                this.el.btnSend.show();

                let cursor = window.getSelection();

                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
                    this.el.inputText.focus();

                    cursor = window.getSelection();
                }

                let range = document.createRange();

                range = cursor.getRangeAt(0);
                range.deleteContents();

                let frag = document.createDocumentFragment();

                frag.appendChild(img);

                range.insertNode(frag);

                range.setStartAfter(img);

            });
        });

    }


    closeRecorMicrophone() {

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();

    }

    closeAllMainPanel() {

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
    }


    closeMenuAttach(e) {

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');

    }

    closeAllLeftPanel() {
        this.el.panelEditProfile.hide()
        this.el.panelAddContact.hide()
    }

    loadElemtens() {

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element
        });

    }

    elementsPrototype() {

        Element.prototype.hide = function () {
            this.style.display = 'none';
            return this
        }

        Element.prototype.show = function () {
            this.style.display = 'block';
            return this
        }

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'block') ? 'none' : 'block';
            return this
        }

        Element.prototype.on = function (events, fn) {

            events.split(' ').forEach(event => {

                this.addEventListener(event, fn);
            });
            return this
        }

        Element.prototype.css = function (styles) {

            for (let name in styles) {
                this.style[name] = styles[name]
            }
            return this
        }

        Element.prototype.addClass = function (className) {
            this.classList.add(className)
            return this
        }

        Element.prototype.removeClass = function (className) {
            this.classList.remove(className)
            return this
        }

        Element.prototype.toggleClass = function (className) {
            this.classList.toggle(className)
            return this
        }

        Element.prototype.hasClass = function (className) {
            return this.classList.contains(className)
        }

        HTMLElement.prototype.getForm = function () {
            return new FormData(this)
        }

        HTMLElement.prototype.toJSON = function () {

            let json = {};

            this.getForm().forEach((value, key) => {
                json[key] = value
            });

            return json
        }


    }

}