import {Player, PlayerAPI} from 'bitmovin-player/modules/bitmovinplayer-core';
import {PlayerConfig, SourceConfig} from 'bitmovin-player/types/core/PlayerConfigAPI';
import AbrModule from 'bitmovin-player/modules/bitmovinplayer-abr';
import Mp4Module from 'bitmovin-player/modules/bitmovinplayer-container-mp4';
import ContainerTsModule from 'bitmovin-player/modules/bitmovinplayer-container-ts';
import EngineBitmovin from 'bitmovin-player/modules/bitmovinplayer-engine-bitmovin';
import EngineNative from 'bitmovin-player/modules/bitmovinplayer-engine-native';
import HlsModule from 'bitmovin-player/modules/bitmovinplayer-hls';
import MseRendererModule from 'bitmovin-player/modules/bitmovinplayer-mserenderer';
import StyleModule from 'bitmovin-player/modules/bitmovinplayer-style';
import AdvertisingCoreModule from 'bitmovin-player/modules/bitmovinplayer-advertising-core';
import AdvertisingModule from 'bitmovin-player/modules/bitmovinplayer-advertising-ima';
import XMLModule from 'bitmovin-player/modules/bitmovinplayer-xml';

import {UIFactory} from './ui-factory';

const videoElementId: string = 'demo-player';
const domElement: HTMLElement | null = document.getElementById(videoElementId);

if (!domElement) {
    throw new Error(`No Element with id ${videoElementId} was found.`);
}

const playerConfig: PlayerConfig = {
    key: process.env.BITMOVIN_API_KEY || '',
    adaptation: {
      preload: false // When this line is deleted the ready callback will be executed.
    },
    events: {
        ready: () => {
            debugger;
        }
    }
};

const sourceConfig: SourceConfig = {
    "title": "Trauminsel Boracay ist wieder ein Paradies",
    "poster": "https://www.welt.de/img/vermischtes/mobile182682304/6721358407-ci16x9-w1024/110617612-jpg.jpg",
    "hls": "https://weltsfclips-vh.akamaihd.net/i/2018/10/25/20181025-112135_ONL_MAZ_Boracay_1023_oL/20181025-112135_ONL_MAZ_Boracay_1023_oL_,2000,1500,1000,200,.mp4.csmil/master.m3u8"
};

[
    EngineBitmovin,
    EngineNative,
    MseRendererModule,
    HlsModule,
    AbrModule,
    Mp4Module,
    ContainerTsModule,
    StyleModule,
    XMLModule,
    AdvertisingCoreModule,
    AdvertisingModule
].forEach(Player.addModule);

const videoPlayer: PlayerAPI = new Player(domElement, playerConfig);

UIFactory.buildUI(videoPlayer, playerConfig);

videoPlayer.load(sourceConfig).catch(
    (error: Error) => console.log(`Error during source loading -> ${error.message}`)
);
