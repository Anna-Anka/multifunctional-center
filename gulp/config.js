import gulp from 'gulp';
import debug from 'gulp-debug';
import { deleteAsync } from 'del';
import imagemin, { svgo } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminGiflossy from 'imagemin-giflossy';
import newer from 'gulp-newer';
import browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulpif from 'gulp-if';
import svg from 'gulp-svg-sprite';
import dartsass from 'sass';
import gulpsass from 'gulp-sass';
import mincss from 'gulp-clean-css';
import groupmedia from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import include from 'gulp-file-include';
import webp from 'gulp-webp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import path from 'path';
import notify from 'gulp-notify';
import zip from 'gulp-zip';
import avif from 'gulp-avif';
import deploy from 'gh-pages';
import filter from 'gulp-filter';

export const plugins = {
    gulp, debug, deleteAsync, imagemin, imageminPngquant, svgo, imageminZopfli, imageminMozjpeg, imageminGiflossy, newer, browsersync, webpack, webpackStream, gulpif, svg, gulpsass, dartsass, mincss, groupmedia, autoprefixer, sourcemaps, plumber, include, webp, ttf2woff, ttf2woff2, path, notify, zip, avif, deploy, filter,
};

const devFolder = './src';
const productFolder = './app';

export const paths = {
    html: {
        src: `${devFolder}/html/*.html`,
        app: `${productFolder}/`,
        watch: `${devFolder}/html/**/*.html`,
    },
    styles: {
        src: `${devFolder}/styles/style.{scss,sass,css}`,
        app: `${productFolder}/css/`,
        watch: `${devFolder}/styles/**/*.{scss,sass,css}`,
    },
    scripts: {
        src: `${devFolder}/js/main.js`,
        app: `${productFolder}/js/`,
        watch: `${devFolder}/js/**/*.js`,
    },
    images: {
        src: `${devFolder}/img`,
        app: `${productFolder}/img`,
        watch: `${devFolder}/img/`,
        srcExceptions: [`!${devFolder}/img/sprites/**/*`]
    },
    sprites: {
        src: `${devFolder}/img/sprites/*.svg`,
        app: `${productFolder}/img/sprites/`,
        watch: `${devFolder}/img/sprites/*.svg`,
    },
    fonts: {
        src: `${devFolder}/fonts/**/*.ttf`,
        app: `${productFolder}/fonts/`,
        watch: `${devFolder}/fonts/**/*`,
    },
    resources: {
        src: `${devFolder}/resources-root/**`
    },
    assets: {
        src: `${devFolder}/assets/**`,
        app: `${productFolder}/assets/`,
        watch: `${devFolder}/assets/`
    },
    devFolder,
    productFolder,
    rootFolder: path.basename(path.resolve()),
};

global.app = {
    production: process.argv.includes('--production'),
    dev: process.argv.includes('--dev'),
    paths,
    plugins
}