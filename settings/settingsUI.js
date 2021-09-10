import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color,@CheckboxProperty } from 'Vigilance';
import SettingsStore from './SettingsStore';
import Authenticator from '../auth';

@Vigilant("projectscyll")
class SettingsUI {

    @TextProperty({
      name: "API settings key",
      description:"Enter your API key to save your settings onto the cloud (currently disabled)",
      category: "General",
      subcategory: "Flips",
      placeholder: "Enter key..."
    })
    key = Authenticator.AUTH_KEY;

      @TextProperty({
        name: "AH flip profit range",
        description:"Enter the range at which you would like to find AH flips for.",
        category: "General",
        subcategory: "Flips",
        placeholder: "Enter flip range..."
      })
    ahflip = SettingsStore.ahrange;

      @TextProperty({
          name: "BIN flip profit range",
          description: "Enter the range at which you would like to find BIN flips for.",
          category: "General",
          subcategory: "Flips",
          placeholder: "Enter flip range..."
      })
    binflip = SettingsStore.binrange;

    @CheckboxProperty({
      name:"Enable BIN flips",
      description:"Enables or Disables BIN flips.",
      category:"General",
      subcategory:"Flips",
    })
    enablebin = SettingsStore.binenabled;

    @CheckboxProperty({
      name:"Enable AH flips",
      description:"Enables or Disables AH flips.",
      category:"General",
      subcategory:"Flips",
    })
    enableah = SettingsStore.ahenabled;

    constructor() {
        this.initialize(this);
        this.registerListener("key", newKey =>{
          Authenticator.UpdateKey(newKey);
        })
        this.registerListener("binflip", newText => {
            SettingsStore.binrange = newText;
        });
        this.registerListener("ahflip",newText =>{
          SettingsStore.ahrange = newText;
        });
        this.registerListener("enablebin",newCheck =>{
          SettingsStore.binenabled = newCheck;
        })

        this.registerListener("enableah",newCheck =>{
          SettingsStore.ahenabled = newCheck;
        })

        this.setCategoryDescription("General", "Find general settings to Project Scyll here.")
        this.setSubcategoryDescription("General", "Flips", "See settings specific to flipping.")
    }
}

export default new SettingsUI;
