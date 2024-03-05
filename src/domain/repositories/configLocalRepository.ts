
import { ConfigLocal } from "@app/models/configLocal";

export abstract class ConfigLocalyRepository {

  abstract update(data : ConfigLocal) : Promise<void>

  abstract get() : Promise<ConfigLocal>

}