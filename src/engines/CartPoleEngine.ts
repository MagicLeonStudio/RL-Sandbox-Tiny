export class CartPoleEngine {
  private gravity = 9.8;
  private cartMass = 1.0;
  private poleMass = 0.1;
  private totalMass = this.cartMass + this.poleMass;
  private length = 0.5;
  private poleMassLength = this.poleMass * this.length;
  private forceMag = 10.0;
  private tau = 0.02;

  private x = 0;
  private xDot = 0;
  private theta = 0;
  private thetaDot = 0;

  private steps = 0;
  private maxSteps = 500;

  reset() {
    this.x = (Math.random() - 0.5) * 0.1;
    this.xDot = 0;
    this.theta = (Math.random() - 0.5) * 0.1;
    this.thetaDot = 0;
    this.steps = 0;
    return this.getState();
  }

  step(action: number): { state: number[]; reward: number; done: boolean } {
    const force = action === 1 ? this.forceMag : -this.forceMag;
    const cosTheta = Math.cos(this.theta);
    const sinTheta = Math.sin(this.theta);

    const temp = (force + this.poleMassLength * this.thetaDot * this.thetaDot * sinTheta) / this.totalMass;
    const thetaAcc = (this.gravity * sinTheta - cosTheta * temp) /
      (this.length * (4.0 / 3.0 - this.poleMass * cosTheta * cosTheta / this.totalMass));
    const xAcc = temp - this.poleMassLength * thetaAcc * cosTheta / this.totalMass;

    this.x += this.tau * this.xDot;
    this.xDot += this.tau * xAcc;
    this.theta += this.tau * this.thetaDot;
    this.thetaDot += this.tau * thetaAcc;
    this.steps++;

    const done =
      Math.abs(this.x) > 2.4 ||
      Math.abs(this.theta) > 12 * 2 * Math.PI / 360 ||
      this.steps >= this.maxSteps;

    return { state: this.getState(), reward: 1, done };
  }

  private getState(): number[] {
    return [this.x, this.xDot, this.theta, this.thetaDot];
  }
}
