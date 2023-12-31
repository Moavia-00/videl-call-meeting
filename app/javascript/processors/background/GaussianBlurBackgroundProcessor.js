"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaussianBlurBackgroundProcessor = void 0;
var BackgroundProcessor_1 = require("./BackgroundProcessor");
var constants_1 = require("../../constants");
var types_1 = require("../../types");
/**
 * The GaussianBlurBackgroundProcessor, when added to a VideoTrack,
 * applies a gaussian blur filter on the background in each video frame
 * and leaves the foreground (person(s)) untouched. Each instance of
 * GaussianBlurBackgroundProcessor should be added to only one VideoTrack
 * at a time to prevent overlapping of image data from multiple VideoTracks.
 *
 * @example
 *
 * ```ts
 * import { createLocalVideoTrack } from 'twilio-video';
 * import { Pipeline, GaussianBlurBackgroundProcessor } from '@twilio/video-processors';
 *
 * const blurBackground = new GaussianBlurBackgroundProcessor({
 *   assetsPath: 'https://my-server-path/assets',
 *   pipeline: Pipeline.WebGL2,
 *   debounce: true,
 * });
 *
 * blurBackground.loadModel().then(() => {
 *   createLocalVideoTrack({
 *     // Increasing the capture resolution decreases the output FPS
 *     // especially on browsers that do not support SIMD
 *     // such as desktop Safari and iOS browsers
 *     width: 640,
 *     height: 480,
 *     // Any frame rate above 24 fps on desktop browsers increase CPU
 *     // usage without noticeable increase in quality.
 *     frameRate: 24
 *   }).then(track => {
 *     track.addProcessor(blurBackground, {
 *       inputFrameBufferType: 'video',
 *       outputFrameBufferContextType: 'webgl2',
 *     });
 *   });
 * });
 * ```
 */
var GaussianBlurBackgroundProcessor = /** @class */ (function (_super) {
    __extends(GaussianBlurBackgroundProcessor, _super);
    /**
     * Construct a GaussianBlurBackgroundProcessor. Default values will be used for
     * any missing properties in [[GaussianBlurBackgroundProcessorOptions]], and
     * invalid properties will be ignored.
     */
    function GaussianBlurBackgroundProcessor(options) {
        var _this = _super.call(this, options) || this;
        _this._blurFilterRadius = constants_1.BLUR_FILTER_RADIUS;
        // tslint:disable-next-line no-unused-variable
        _this._name = 'GaussianBlurBackgroundProcessor';
        _this.blurFilterRadius = options.blurFilterRadius;
        return _this;
    }
    Object.defineProperty(GaussianBlurBackgroundProcessor.prototype, "blurFilterRadius", {
        /**
         * The current background blur filter radius in pixels.
         */
        get: function () {
            return this._blurFilterRadius;
        },
        /**
         * Set a new background blur filter radius in pixels.
         */
        set: function (radius) {
            if (!radius) {
                console.warn("Valid blur filter radius not found. Using " + constants_1.BLUR_FILTER_RADIUS + " as default.");
                radius = constants_1.BLUR_FILTER_RADIUS;
            }
            this._blurFilterRadius = radius;
        },
        enumerable: false,
        configurable: true
    });
    GaussianBlurBackgroundProcessor.prototype._getWebGL2PipelineType = function () {
        return types_1.WebGL2PipelineType.Blur;
    };
    GaussianBlurBackgroundProcessor.prototype._setBackground = function (inputFrame) {
        if (!this._outputContext) {
            return;
        }
        var ctx = this._outputContext;
        ctx.filter = "blur(" + this._blurFilterRadius + "px)";
        ctx.drawImage(inputFrame, 0, 0);
    };
    return GaussianBlurBackgroundProcessor;
}(BackgroundProcessor_1.BackgroundProcessor));
exports.GaussianBlurBackgroundProcessor = GaussianBlurBackgroundProcessor;
//# sourceMappingURL=GaussianBlurBackgroundProcessor.js.map