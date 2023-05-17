const TWITTER_EPOCH = 1288834974657;

export class UidConfiguration {
  private dataCenterId!: number;
  private nodeId!: number;

  constructor(dataCenterId: number, nodeId: number) {
    this.dataCenterId = dataCenterId;
    this.nodeId = nodeId;
  }

  public getDataCenterId(): number {
    return this.dataCenterId;
  }

  public getNodeId(): number {
    return this.nodeId;
  }
}

export class Uid {
  private timestamp!: bigint;
  private dataCenter!: number;
  private node!: number;
  private sequence!: number;
  private id?: BigInt;

  constructor(
    timestamp: bigint,
    datacenter: number,
    node: number,
    sequence: number
  ) {
    this.timestamp = timestamp;
    this.dataCenter = datacenter;
    this.node = node;
    this.sequence = sequence;
  }

  public getTimestamp(): BigInt {
    return this.timestamp;
  }

  public getDataCenter(): number {
    return this.dataCenter;
  }

  public getNode(): number {
    return this.node;
  }

  public getSequence(): number {
    return this.sequence;
  }

  public getId(): BigInt {
    return this.id
      ? this.id
      : (this.id =
          this.timestamp +
          BigInt(this.dataCenter + this.node + this.sequence).valueOf());
  }
}

export class UidGenerator {
  private timeInMilliseconds: number;
  private dataCenter: number;
  private node: number;
  private sequence: number;
  private uidConfiguration: UidConfiguration;

  constructor(uidConfiguration: UidConfiguration) {
    this.uidConfiguration = uidConfiguration;
    this.timeInMilliseconds = Date.now();
    this.node = this.uidConfiguration.getNodeId() << 12; // 12 = Sequence bits size
    this.dataCenter = this.uidConfiguration.getDataCenterId() << 17; // 17 = Sequence size + Node size
    this.sequence = 0;
  }

  public generate(): Uid {
    const currentTimeInMillis = Date.now();
    const diff = currentTimeInMillis - this.timeInMilliseconds;
    this.sequence = (diff >= 1) ? 1 : this.sequence + 1;
    this.timeInMilliseconds = currentTimeInMillis;
    const timestamp = BigInt(currentTimeInMillis + TWITTER_EPOCH) << 22n;
    return new Uid(timestamp, this.dataCenter, this.node, this.sequence);
  }
}
