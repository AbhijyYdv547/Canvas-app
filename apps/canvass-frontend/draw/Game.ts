import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[]
    private roomId: string;
    socket: WebSocket
    private startX = 0
    private startY = 0
    private clicked: boolean
    private selectedTool: Tool = "circle"
    private cameraOffset = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    private cameraZoom = 1
    private MAX_ZOOM = 5
    private MIN_ZOOM = 0.1
    private SCROLL_SENSITIVITY = 0.0005
    private isDragging = false
    private dragStart = { x: 0, y: 0 }
    private lastZoom = this.cameraZoom
    private initialPinchDistance: number | null = null


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = []
        this.roomId = roomId
        this.socket = socket
        this.clicked = false
        this.init()
        this.initHandlers()
        this.initMouseHandlers()
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }

    setTool(tool: "circle" | "pencil" | "rect") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas()
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message)
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {

        this.ctx.save(); // Save the current transformation state

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Apply camera transform BEFORE drawing
        this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
        this.ctx.scale(this.cameraZoom, this.cameraZoom);


        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255,255,255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath()
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke()
                this.ctx.closePath()
            }
        })
        this.ctx.restore();
    }

    mouseDownHandler = (e) => {
        this.clicked = true;

        const { x, y } = this.getTransformedMousePos(e.clientX, e.clientY);
        this.startX = x
        this.startY = y
    }

    mouseUpHandler = (e) => {
        this.clicked = false;

        const { x, y } = this.getTransformedMousePos(e.clientX, e.clientY);
        const width = x - this.startX;
        const height = y - this.startY;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius
            }
        }

        if (!shape) {
            return;
        }

        this.existingShapes.push(shape)

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }))
    }

    mouseMoveHandler = (e) => {
        if (this.clicked) {

            const { x, y } = this.getTransformedMousePos(e.clientX, e.clientY);
            const width = x - this.startX;
            const height = y - this.startY;
            this.clearCanvas()
            this.ctx.save();
            this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
            this.ctx.scale(this.cameraZoom, this.cameraZoom);
            this.ctx.strokeStyle = "white";

            const selectedTool = this.selectedTool;
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            }
            else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath()
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke()
                this.ctx.closePath()
            }
            this.ctx.restore();
        }
    }

    getEventLocation(e) {
        if (e.touches && e.touches.length == 1) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
        else if (e.clientX && e.clientY) {
            return { x: e.clientX, y: e.clientY }
        }
    }

    onPointerDown(e) {
        this.isDragging = true
        this.dragStart.x = this.getEventLocation(e)!.x / this.cameraZoom - this.cameraOffset.x
        this.dragStart.y = this.getEventLocation(e)!.y / this.cameraZoom - this.cameraOffset.y
    }

    onPointerUp(e) {
        this.isDragging = false
        this.initialPinchDistance = null
        this.lastZoom = this.cameraZoom
    }

    onPointerMove(e) {
        if (this.isDragging) {
            this.cameraOffset.x = this.getEventLocation(e)!.x / this.cameraZoom - this.dragStart.x
            this.cameraOffset.y = this.getEventLocation(e)!.y / this.cameraZoom - this.dragStart.y
        }
    }

    handleTouch(e, singleTouchHandler) {
        if (e.touches.length == 1) {
            singleTouchHandler(e)
        }
        else if (e.type == "touchmove" && e.touches.length == 2) {
            this.isDragging = false
            this.handlePinch(e)
        }
    }

    handlePinch(e) {
        e.preventDefault()

        let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }


        let currentDistance = (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2

        if (this.initialPinchDistance == null) {
            this.initialPinchDistance = currentDistance
        }
        else {
            this.adjustZoom(null, currentDistance / this.initialPinchDistance)
        }
    }

    adjustZoom(zoomAmount: number, zoomFactor: number|null,zoomCenter: { x: any; y: any; } | undefined) {
        if (!this.isDragging) {
            const oldZoom = this.cameraZoom;
            if (zoomAmount) {
                this.cameraZoom += zoomAmount
            }
            else if (zoomFactor) {
                console.log(zoomFactor)
                this.cameraZoom = zoomFactor * this.lastZoom
            }

            this.cameraZoom = Math.min(this.cameraZoom, this.MAX_ZOOM)
            this.cameraZoom = Math.max(this.cameraZoom, this.MIN_ZOOM)

            if (zoomCenter) {

            const dx = zoomCenter.x - this.cameraOffset.x;
            const dy = zoomCenter.y - this.cameraOffset.y;

            this.cameraOffset.x -= dx * (this.cameraZoom / oldZoom - 1);
            this.cameraOffset.y -= dy * (this.cameraZoom / oldZoom - 1);
        }

            console.log(zoomAmount)
            this.clearCanvas();
        }
    }

    mouseScrollHandler = (e) => {
    e.preventDefault(); 
    const zoomCenter = { x: e.clientX, y: e.clientY };
    this.adjustZoom(e.deltaY * this.SCROLL_SENSITIVITY, null, zoomCenter);
}


    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)

        this.canvas.addEventListener('wheel', this.mouseScrollHandler)
    }

    getTransformedMousePos = (x: number, y: number) => {
        return {
            x: (x - this.cameraOffset.x) / this.cameraZoom,
            y: (y - this.cameraOffset.y) / this.cameraZoom
        };
    };

}