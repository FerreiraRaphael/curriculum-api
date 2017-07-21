// @flow
export default class Facade {
  Schema: any;

  constructor(Schema: any) {
    this.Schema = Schema;
  }

  create(input: Object): Promise<any> {
    const Schema: any = new this.Schema(input);
    return Schema.save();
  }

  update(conditions: Object, update: Object) {
    return this.Schema.update(conditions, update, { new: true }).exec();
  }

  find(...query: any) {
    return this.Schema.find(...query).exec();
  }

  findOne(...query: any) {
    return this.Schema.findOne(...query).exec();
  }

  findById(id: string) {
    return this.Schema.findById(id).exec();
  }

  remove(id: string) {
    return this.Schema.findByIdAndRemove(id).exec();
  }
}
