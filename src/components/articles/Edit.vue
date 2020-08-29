<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Articles

                        <!-- Role -->
                        <div class="pull-rights ui-mt-15 pull-right ">
                            <div class="dropdown">
                                <span class="badge badge-md badge-pill badge-secondary-soft">
                                    {{ auth.role }}
                                </span>
                            </div>
                        </div>
                        <!-- End Role -->

                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'articles' }">Articles</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

        <div v-if="pgLoading" class="row h-100">
            <div class="container text-center">
                <p><br/></p>
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p><br/></p>
            </div>
        </div>

        <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">        
                    <div class="col-md-8 mb-5">


                    <!-- CardMeta -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabMeta" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Meta')"
                                            aria-expanded="false" 
                                            aria-controls="collapseMeta" 
                                            data-toggle="collapse"
                                            data-target="#collapseMeta">Meta
                                            <span id="iconToggleMeta" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseMeta" 
                                        class="collapse show" 
                                        aria-labelledby="TabMeta" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- Meta title -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputText4">Meta title</label>
                                            <input class="form-control"
                                                    id="inputText4"  
                                                    type="text" 
                                                    v-model="row.meta_title">
                                        </div>
                                        <!-- End Meta title -->
                                            
                                        <!-- Meta keywords -->
                                        <div class="form-group">
                                            <div class="pull-right f12"
                                                v-if="row.meta_keywords" 
                                                v-text="(row.meta_keywords.length)">
                                            </div>
                                            <label for="inputText5">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="inputText5" 
                                                    rows="5"  
                                                    v-model="row.meta_keywords">
                                            </textarea>
                                        </div>
                                        <!-- End Meta keywords -->

                                        <!-- Meta description -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_description" 
                                                v-text="(row.meta_description.length)">
                                            </div>
                                            <label for="inputText6">Meta description</label>
                                            <textarea class="form-control" 
                                                    id="inputText6" 
                                                    rows="5" 
                                                    v-model="row.meta_description">
                                            </textarea>
                                        </div>
                                        <!-- End Meta description -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End CarDMeta -->


                        <!-- CardDest -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabArticle" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Article')"
                                            aria-expanded="false" 
                                            aria-controls="collapseArticle" 
                                            data-toggle="collapse"
                                            data-target="#collapseArticle">Article
                                            <span id="iconToggleArticle" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseArticle" 
                                        class="collapse" 
                                        aria-labelledby="TabArticle" 
                                        data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputText1">Title</label>
                                        <input class="form-control" 
                                                id="inputText1" 
                                                type="text" 
                                                v-model="row.title" 
                                                @keyup="onTitleChange">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                        <label for="inputText2">Slug</label>
                                        <input class="form-control text-lowercase"
                                                id="inputText2"  
                                                type="text" 
                                                v-model="row.slug" 
                                                @keydown.space.prevent 
                                                @paste="onSlugPaste"
                                                @change="onSlugChange(false)">
                                    </div>
                                    <!-- End Slug -->

                                    <!-- Short Body -->
                                    <div class="form-group">
                                        <label for="inputText3_1">Short body</label>
                                        <editor
                                            id="inputText3_1"
                                            v-model="row.short_body"
                                            api-key="xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b"
                                            :init="{
                                                height: 300,
                                                menubar: 'file edit view insert format tools table tc help',
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help'
                                            }"
                                        />
                                    </div>
                                    <!-- End Short Body -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputText3">Body</label>
                                        <editor
                                            id="inputText3"
                                            v-model="row.body"
                                            api-key="xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b"
                                            :init="{
                                                height: 600,
                                                menubar: 'file edit view insert format tools table tc help',
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help'
                                            }"
                                        />
                                    </div>
                                    <!-- End Body -->

                                </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End CardDest -->



                    <!-- Card Items -->
                    <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabItems" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Items')"
                                            aria-expanded="false" 
                                            aria-controls="collapseItems" 
                                            data-toggle="collapse"
                                            data-target="#collapseItems">Items
                                            <span id="iconToggleItems" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseItems" 
                                        class="collapse" 
                                        aria-labelledby="TabItems" 
                                        data-parent="#accordion">

                                <div class="col-12 pt-3">
                                
                                <!-- For Loop -->
                                <div v-for="i in 10" 
                                    :key="i" 
                                    :ref="'frm_'+i" 
                                    :class="(i != 1) ? 'hidden' : '' " 
                                    :id="'frm_'+i">

                                    <!-- Remove -->
                                    <div class="pull-right ui-mt-10">
                                        <button v-if="i != 1"
                                            type="button" 
                                            class="btn btn-danger btn-circle btn-with-icon btn-sm" 
                                            @click="removeOption(i)">
                                            <span class="btn-icon ti-close font-bold"></span>
                                        </button>
                                    </div>
                                    <!-- End Remove -->

                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputText1_1">Link</label>
                                        <input class="form-control" 
                                                id="inputText1_1" 
                                                type="text" 
                                                v-model="row.items_link[i]">
                                    </div>
                                    <!-- End Title -->

                                     <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputText1_2">Order</label>
                                        <input class="form-control" 
                                                id="inputText1_2" 
                                                type="text" 
                                                v-model="row.items_order[i]">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label :for="'editorItems_'+i">Body</label>
                                        <editor
                                            :id="'editorItems_'+i"
                                            v-model="row.items_body[i]"
                                            api-key="xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b"
                                            :init="{
                                                height: 300,
                                                menubar: 'file edit view insert format tools table tc help',
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help'
                                            }"
                                        />
                                    </div>
                                    <!-- End Short Body -->

                                    <!-- image alt -->
                                    <div class="form-group">
                                        <label for="inputText1_2">Image alt</label>
                                        <input class="form-control" 
                                                id="inputText1_2" 
                                                type="text" 
                                                v-model="row.items_image_alt[i]">
                                    </div>
                                    <!-- End image alt -->

                                    <!-- image title -->
                                    <div class="form-group">
                                        <label for="inputText1_2">Image title</label>
                                        <input class="form-control" 
                                                id="inputText1_2" 
                                                type="text" 
                                                v-model="row.items_image_title[i]">
                                    </div>
                                    <!-- End image title -->

                                    <!-- image -->
                                    <div class="form-group">
                                        <label for="inputText1_2">Image</label>
                                        <img v-if="row.items_preview[i]" 
                                            :src="row.items_preview[i]">
                                        <input class="form-control" 
                                                id="inputText1_2" 
                                                type="file"
                                                ref="myDropify" 
                                                v-on:change="onItemsImageChange">
                                    </div>
                                    <!-- End image -->
                                    
                                    <!-- Button -->
                                    <div class="row pull-right ui-mt15" :ref="'btn_'+i" :id="'btn_'+i">
                                        <button type="button" 
                                            class="btn btn-dark btn-circle btn-with-icon"
                                            @click="opnFrm(i+1)">
                                            <span class="btn-icon ti-plus font-bold"></span>
                                        </button>
                                    </div>
                                    <!-- End Button -->

                                    <div class="form-group">
                                        <br/><hr><br/>
                                    </div>
                                </div>
                                <!-- End Loop -->

                                    
                                </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Items -->


                </div>





                    <!-- ******* SideNavbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- NavOne -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavWriter" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Writer')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavWriter" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavWriter">Writer
                                            <span id="iconToggleWriter" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavWriter" 
                                        class="collapse" 
                                        aria-labelledby="NavWriter" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Region -->
                                            <div class="form-group">
                                                <div v-if="writerLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <select class="form-control custom-select"
                                                    v-if="!writerLoading" 
                                                    v-model="row.writer_id">
                                                    <option value="">Select Writer</option>
                                                    <option v-for="(writer, index) in writers" 
                                                            :key="index"
                                                            :value="writer.id">
                                                            {{ writer.title }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- End Region -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavOne -->


                        <!-- NavOne -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavDestination" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Destination')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavDestination" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavDestination">Destination
                                            <span id="iconToggleDestination" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavDestination" 
                                        class="collapse" 
                                        aria-labelledby="NavDestination" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Destinations -->
                                            <div class="form-group">
                                                <div v-if="destinationLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <select class="form-control custom-select"
                                                    v-if="!destinationLoading" 
                                                    v-model="row.destination_id">
                                                    <option value="">Select Destination</option>
                                                    <option v-for="(destination, index) in destinations" 
                                                            :key="index"
                                                            :value="destination.id">
                                                            {{ destination.title }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- End Destination -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavOne -->


                        <!-- NavOne -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavCategory" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Category')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavCategory" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavCategory">Category
                                            <span id="iconToggleCategory" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavCategory" 
                                        class="collapse" 
                                        aria-labelledby="NavCategory" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Category -->
                                            <div class="form-group">
                                                <div v-if="categoryLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <select class="form-control custom-select"
                                                    v-if="!categoryLoading" 
                                                    v-model="row.category_id">
                                                    <option value="">Select Category</option>
                                                    <option v-for="(category, index) in categories" 
                                                            :key="index"
                                                            :value="destination.id">
                                                            {{ category.title }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- End Category -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavOne -->


                        <!-- NavOne -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavPackages" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Packages')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavPackages" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavPackages">Packages Related
                                            <span id="iconTogglePackages" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavPackages" 
                                        class="collapse" 
                                        aria-labelledby="NavPackages" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Region -->
                                            <div class="form-group">
                                                <div v-if="packageLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <multiselect v-if="!packageLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="packagesValue" 
                                                    :options="packagesOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search packages"
                                                    :preselect-first="true">
                                                </multiselect>
                                            </div>
                                            <!-- End Region -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavOne -->

                        <!-- NavTwo -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavImage" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('Image')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavImage" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavImage">Featued Image
                                            <span id="iconToggleImage" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavImage" 
                                        class="collapse" 
                                        aria-labelledby="NavImage" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Image -->
                                            <div class="form-group">
                                                <img :src="row.preview" 
                                                    class="mb-2 h200 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify" 
                                                    v-on:change="onImageChange">
                                            </div>
                                            <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_title">
                                            </div>
                                            <!-- Image -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavTwo -->


                        <!-- NavThree -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavStatus" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Status')"
                                            aria-expanded="false" 
                                            aria-controls="collapseNavStatus" 
                                            data-toggle="collapse"
                                            data-target="#collapseNavStatus">Status & Visibility
                                            <span id="iconToggleStatus" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavStatus" 
                                        class="collapse" 
                                        aria-labelledby="NavStatus" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Status -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch1" 
                                                        :checked="row.status"
                                                        @click="onStatus">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch1"
                                                        v-html="(row.status) ? 'Active' : 'Inactive'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Status -->

                                            <!-- Featured -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch2" 
                                                        :checked="row.featured"
                                                        @click="onFeatured">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch2"
                                                        v-html="(row.featured) ? 'Featured article' 
                                                                               : 'Normal article'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Featured -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavThree -->

                        </div>
                    </div>
                </div>
                <!-- End Content -->

                    

                    <div class="col-md-12 row">
                        <div class="form-group mr-2">
                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>Loading...
                                </span>
                                <span v-if="!btnLoading" class="ti-check-box"></span>
                                <span v-if="!btnLoading"> Updated Article</span>
                            </button>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-danger" 
                                :disabled="btnLoading" 
                                @click="cancel">
                                <span class="ti-close"></span>
                                <span> Cancel </span>
                            </button>
                        </div>
                    </div>


                </form>
            </div>


                <Footer></Footer>
            </div>
        </main>
        <!-- End Main -->
        
    </div>
</template>

<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';
    import Editor from '@tinymce/tinymce-vue';
    import Multiselect from 'vue-multiselect';
    import iziToast from 'izitoast';
    
    export default {
        name: 'Create',
        components: {
            Header,
            Navigation,
            Footer,
            Editor,
            Multiselect
        },
        data(){
            return {
                //
                auth: {
                    role: '',
                    access_token: '',
                },
                row: {
                    writer_id: '',
                    category_id: '',
                    destination_id: '',
                    status: 1,
                    featured: 0,
                    preview: '',
                    image_url: '',
                    image_alt: '',
                    image_title: '',
                    
                    slug: '',
                    title: '',
                    short_body: '',
                    body: '',

                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',

                    // items
                    items: [],
                    items_link: [],
                    items_order: [],
                    items_body: [],

                    items_preview: [],
                    items_image_url: [],
                    items_image_alt: [],
                    items_image_title: []
                },
                packagesValue: [],
                packagesOptions: [],
                writers: [],
                destinations: [],
                categories: [],
                writerLoading: true,
                destinationLoading: true,
                categoryLoading: true,
                packageLoading: true,
                pgLoading: true,
                btnLoading: false,
            }
        },
        mounted() {},
        computed: {},
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }   

            this.fetchRow();
        },
        methods: {
            
            // toggleCollapse
            collapseToggle(div) {
                let el = document.querySelector("span#iconToggle"+div);
                if(el.classList.contains('ti-angle-down')) {
                    el.classList.remove('ti-angle-down');
                    el.classList.add('ti-angle-up');
                } else {
                    el.classList.remove('ti-angle-up');
                    el.classList.add('ti-angle-down');
                }
            }, 

            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/articles/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;
                    this.row.writer_id = (res.data.row.writer) ? res.data.row.writer.id : null;
                    this.row.category_id = (res.data.row.category) ? res.data.row.category.id : null;
                    this.row.destination_id = (res.data.row.destination) ? res.data.row.destination.id : null;
                    this.row.status= res.data.row.status;
                    this.row.featured= res.data.row.featured;

                    this.row.preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.age_title : null;
                        
                    this.row.slug = res.data.row.slug;
                    this.row.title = res.data.row.title;
                    this.row.body = res.data.row.body;
                    this.row.short_body = res.data.row.short_body;

                    this.row.meta_title = (res.data.row.meta) ? res.data.row.meta.meta_title : null;
                    this.row.meta_keywords = (res.data.row.meta) ? res.data.row.meta.meta_keywords : null;
                    this.row.meta_description = (res.data.row.meta) ? res.data.row.meta.meta_description : null;

                    this.row.items = (res.data.row.items) ?? null;
                    this.fetchWriters();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Fetch Writer
            fetchWriters(){
                this.writerLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/writers',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.writerLoading = false;
                        this.writers = res.data.rows;
                        this.fetchDestinations();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Fetch Destination
            fetchDestinations(){
                this.destinationLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/destinations',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.destinationLoading = false;
                        this.destinations = res.data.rows;
                        this.fetchCategories();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Fetch Categories
            fetchCategories(){
                this.categoryLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/categories',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.categoryLoading = false;
                        this.categories = res.data.rows;
                        this.fetchPackages();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Packages
            fetchPackages(){
                this.packageLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/packages',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.packageLoading = false;
                        this.packagesOptions = res.data.packages;
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                this.row.image_url = file;
            },

            onItemsImageChange(e) {
                const file = e.target.files[0];
                this.row.items_preview = URL.createObjectURL(file);
                this.row.items_image_url = file;
            },


            // Add New
            editRow(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                // items
                for( let i = 1; i < this.row.items_link.length; i++ ) {
                    this.row.items[i] = {
                        'link' : this.row.items_link[i],
                        'body' : this.row.items_body[i],
                        'order' : this.row.items_order[i],
                        //
                        'image_url' : this.row.items_image_url[i],
                        'image_alt' : this.row.items_image_alt[i],
                        'image_title' : this.row.items_image_title[i]
                    }
                }
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/articles/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        writer_id: this.row.writer_id,
                        destination_id: this.row.destination_id,
                        category_id: this.row.category_id,

                        status: this.row.status,
                        featured: this.row.featured,

                        image_url: this.row.image_url,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

                        title: this.row.title,
                        slug: this.row.slug,
                        short_body: this.row.short_body,
                        body: this.row.body,

                        meta_title: this.row.meta_title,
                        meta_keywords: this.row.meta_keywords,
                        meta_description: this.row.meta_description,

                        items: this.row.items
                    }
                }
                this.axios(options, config)
                    .then(() => {
                        this.btnLoading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Item Updated Successfully.',
                        });
                        this.$router.push({ name: 'articles' })
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 403) {
                            this.removeLocalStorage()
                            this.$router.push({ name: 'forbidden' })
                        } else {
                            this.btnLoading = false;
                            iziToast.warning({
                                icon: 'ti-alert',
                                title: 'Wow-man,',
                                message: err.response.data.message
                            });
                        }
                    })
                    .finally(() => {})
            },

            // Title
            onTitleChange() {
                this.onSlugChange(this.row.title);
            },

            // on Paste
            onSlugPaste(){
                let str = this.row.slug;
                this.onSlugChange(str);
            },
            onSlugChange(str){
                if(!str) {
                   let str = this.row.slug;
                   this.row.slug = str.replace(/\s+/g, '-');
                } else {
                    this.row.slug = str.replace(/\s+/g, '-');
                }
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },
            onFeatured(){
                if(this.row.featured)
                    this.row.featured = 0;
                else
                    this.row.featured = 1;
            },

            // items add more
            opnFrm(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn_'+prev);
                let frm = document.querySelector('#frm_'+i);
                pvt.classList.add('hidden');
                frm.classList.remove('hidden');
            },
            removeOption(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn_'+prev);
                let frm = document.querySelector('#frm_'+i);
                frm.classList.add('hidden');
                pvt.classList.remove('hidden');
                this.row.items_link[i] = '';
                this.row.items_order[i] = '';
                this.row.items_body[i] = '';
                this.row.items_image_alt[i] = '';
                this.row.items_image_title[i] = '';
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'articles' });
                }
            },

        },

        // Before Enter..
        //beforeRouteEnter (to, from, next) { 
          // next(vm => { 
          //   //next();
          // }) 
        //},

        // Before Leaving.. 
        // beforeRouteLeave(to, from, next) { 
        //     if(this.row.title && !this.isSubmit) {
        //         const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        //         if (answer) {
        //             next()
        //         } else {
        //             next(false)
        //         }
        //     } else { next() }
        // },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
